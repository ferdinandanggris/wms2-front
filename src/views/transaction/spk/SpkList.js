import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const SpkList = ({ user, data, refreshData, deleteData, exportData }) => {
    const title = "SPK Module";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction/spk";
    const url = "order";
    const role = "Transaction - SPK";

    const columns = [
        { label: "Voucher #", key: "voucherNo", width: 40, type: "text", align: "left", cardTitle: true },
        { label: "Customer", key: "customerId", width: 40, type: "text", align: "left", cardSubTitle: true },
        { label: "Warehouse", key: "warehouseId", width: 40, type: "text", align: "left", cardSubTitle: true },
        { label: "Created By", key: "createdBy", width: 40, type: "datetime", align: "left", cardSubTitle: true },
        { label: "Created Date", key: "dateIn", width: 40, type: "datetime", align: "left", cardSubTitle: true },
        { label: "Shipping Date", key: "shippingDate", width: 40, type: "datetime", align: "left", cardSubTitle: true },
        { label: "LINE", key: "line", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "Status", key: "status", width: 40, type: "badge", align: "Center", cardSubTitle: true },
        { label: "Print", key: "print", width: 40, type: "text", align: "Center", cardSubTitle: true },
    ];

    const exportFilename = "spk.csv";

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
                return "Completed";
            else if (value == "N")
                return "Incomplete";
            else if (value == "C")
                return "Closed";
            else
                return "";

        }
        else if (col.key == "warehouseId") {
            if (item.warehouse != null)
                return item.warehouse.name;
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

SpkList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(SpkList);
