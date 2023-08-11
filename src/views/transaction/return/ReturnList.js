import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";
import { loadCustomer } from "../../../actions/master";

const ReturnList = ({ user, data, refreshData, deleteData, exportData, master, loadCustomer }) => {

    const title = "Return Module";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction/return";
    const url = "Return";
    const role = "Transaction - Return";

    const columns = [
        { label: "VOUCHER #", key: "voucherNo", width: 40, type: "text", align: "left", cardTitle: true },
        { label: "REFERENCE #", key: "referenceNo", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "CUSTOMER", key: "customerId", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "CREATED BY", key: "createdBy", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "CREATED DATE", key: "dateIn", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "POSTED BY", key: "postedBy", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "POSTED DATE", key: "postDate", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "LINE", key: "line", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "STATUS", key: "status", width: 40, type: "text", align: "right", cardSubTitle: true },
    ];

    const exportFilename = "Return.csv";

    useEffect(() => {
        if (user !== null) {
            refreshData({ url });
        }
        loadCustomer();
    }, [user, refreshData, loadCustomer]);

    const customRenderValue = (col, value, item) => {
        if (col.key === "customerId") {
            if (master.customer !== null && master.customer !== undefined) {
                if (value) {
                    const tempCustomer = master.customer.find((obj) => obj.id === value);
                    return tempCustomer.name;
                } else {
                    return "";
                }
            }
        };
    };

    return (
        <ListWrapper
            img={img}
            title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} customRenderValue={customRenderValue}
        />
    )
};

ReturnList.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    master: PropTypes.object,
    refreshData: PropTypes.func,
    deleteData: PropTypes.func,
    exportData: PropTypes.func,
    loadCustomer: PropTypes.func
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
    master: state.master
});

export default connect(mapStateToProps, { refreshData, deleteData, exportData, loadCustomer })(ReturnList);
