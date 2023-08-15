import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";
import { loadVendor } from "../../../actions/master";

const ItemAdjustmentList = ({ user, data, refreshData, deleteData, exportData, master, loadVendor }) => {
    const title = "Item Adjustment Module";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction/item-adjustment";
    const url = "ItemAdjustment";
    const role = "Transaction - Item Adjustment";

    const columns = [
        { label: "VOUCHER #", key: "voucherNo", width: 40, align: "left", cardTitle: true },
        { label: "REFERENCE #", key: "referenceNo", width: 40, align: "left", cardSubTitle: true },
        { label: "VENDOR", key: "vendorId", width: 40, align: "left", cardSubTitle: true },
        { label: "CREATED BY", key: "createdBy", width: 40, align: "left", cardSubTitle: true },
        { label: "CREATED DATE", key: "createddate", width: 40, type: "datetime", align: "left", cardSubTitle: true },
        { label: "POSTED BY", key: "postedBy", width: 40, align: "left", cardSubTitle: true },
        { label: "POSTED DATE", key: "postDate", width: 40, type: "datetime", align: "left", cardSubTitle: true },
        { label: "STATUS", key: "status", width: 40, type: "badge", align: "center", cardSubTitle: true },
    ];

    const exportFilename = "Item-Adjustment.csv";

    useEffect(() => {
        if (user !== null) {
            refreshData({ url });
        }
        loadVendor();
    }, [user, refreshData, loadVendor]);

    const customRenderValue = (col, value, item) => {
        if (col.key === "vendorId") {
            if (master.vendor !== null && master.vendor !== undefined) {
                if (value) {
                    const tempVendor = master.vendor.find((obj) => obj.id === value);
                    return tempVendor ? tempVendor.code : "";
                } else {
                    return "";
                }
            }
        } else if (col.key == "status") {
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

ItemAdjustmentList.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    master: PropTypes.object,
    refreshData: PropTypes.func,
    deleteData: PropTypes.func,
    exportData: PropTypes.func,
    loadVendor: PropTypes.func
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
    master: state.master,
});

export default connect(mapStateToProps, { refreshData, deleteData, exportData, loadVendor })(ItemAdjustmentList);
