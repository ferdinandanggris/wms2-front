import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const ItemAdjustmentList = ({ user, data, refreshData, deleteData, exportData }) => {
    const title = "Item Adjustment Module";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction/item-adjustment";
    const url = "ItemAdjustment";
    const role = "Transaction - Item Adjustment";

    const columns = [
        { label: "VOUCHER #", key: "voucherNo", width: 40, type: "text", align: "left", cardTitle: true },
        { label: "REFERENCE #", key: "referenceNo", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "VENDOR", key: "vendorId", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "CREATED BY", key: "createdBy", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "CREATED DATE", key: "createddate", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "POSTED BY", key: "postedBy", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "POSTED DATE", key: "postDate", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "LINE", key: "line", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "STATUS", key: "status", width: 40, type: "text", align: "right", cardSubTitle: true },
    ];

    const exportFilename = "Item Adjustment.csv";

    useEffect(() => {
        if (user !== null) {
            refreshData({ url });
        }
    }, [user, refreshData]);

    return (
        <ListWrapper
            img={img}
            title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData}
        />
    )
};

ItemAdjustmentList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(ItemAdjustmentList);
