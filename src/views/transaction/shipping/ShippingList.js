import { useEffect } from "react";
import { FaTruckLoading } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const ShippingList = ({ user, data, refreshData, deleteData, exportData }) => {
    const title = "Shipping Module";
    const img = <FaTruckLoading className="module-img" />;
    const path = "/transaction/shipping";
    const url = "Shipping";
    const role = "Transaction - Shipping";

    const columns = [
        { label: "VOUCHER #", key: "voucherNo", width: 40, type: "text", align: "left", cardTitle: true },
        { label: "REFERENCE #", key: "referenceNo", width: 40, type: "text", align: "left", cardSubTitle: true },
        { label: "CUSTOMER", key: "customerId", width: 40, type: "text", align: "left", cardSubTitle: true },
        { label: "SPK#", key: "orderId", width: 40, type: "text", align: "left", cardSubTitle: true },
        { label: "CREATED BY", key: "createdBy", width: 40, type: "text", align: "left", cardSubTitle: true },
        { label: "CREATED DATE", key: "creatDate", width: 40, type: "datetime", align: "left", cardSubTitle: true },
        { label: "POSTED BY", key: "postedBy", width: 40, type: "text", align: "left", cardSubTitle: true },
        { label: "POSTED DATE", key: "postDate", width: 40, type: "datetime", align: "left", cardSubTitle: true },
        { label: "STATUS", key: "status", width: 40, type: "badge", align: "left", cardSubTitle: true },
    ];

    const exportFilename = "Shipping.csv";

    useEffect(() => {
        if (user !== null) {
            refreshData({ url });
        }
    }, [user, refreshData]);

    const customRenderValue = (col, value, item) => {
        if (col.key == "customerId") {
            if (item.customer != null)
                return item.customer.name;
            else
                return "";
        }
        else if (col.key == "status") {
            if (value == "Y")
                return { text: "Posted", className: "badge-success" };
            else if (value == "N")
                return { text: "Waiting", className: "badge-warning" };
            else if (value == "C")
                return { text: "Draft", className: "badge-primary" };
            else
                return "";
        }
    };

    return (
        <ListWrapper
            img={img}
            title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} customRenderValue={customRenderValue}
        />
    )
};

ShippingList.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    refreshData: PropTypes.func,
    deleteData: PropTypes.func,
    exportData: PropTypes.func,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
});

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(ShippingList);
