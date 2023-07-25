import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const BatchNumberList = ({ user, data, refreshData, deleteData, exportData }) => {
    const title = "Batch Number Module";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/transaction/batch-number";
    const url = "batch-number";
    const role = "Transaction - Batch Number";

    const columns = [
        { label: "CODE", key: "code", width: 40, type: "text", align: "left", cardTitle: true },
        { label: "ITEM #", key: "item", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "ITEM", key: "item", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "STATUS", key: "status", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "INITIAL", key: "initial", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "INCOMING", key: "incoming", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "OUTGOING", key: "outgoing", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "BALANCE", key: "balance", width: 40, type: "text", align: "right", cardSubTitle: true },
    ];

    const exportFilename = "batchNumber-type.csv";

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

BatchNumberList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(BatchNumberList);
