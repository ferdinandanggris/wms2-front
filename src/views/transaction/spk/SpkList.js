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
    const url = "Spk";
    const role = "Transaction - SPK";

    const columns = [
        { label: "VOUCHER #", key: "voucher", width: 40, type: "text", align: "left", cardTitle: true },
        { label: "CUSTOMER", key: "customer", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "WAREHOUSE", key: "warehouse", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "CREATED BY", key: "createdby", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "CREATED DATE", key: "createddate", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "SHIPING DATE", key: "shipingdate", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "LINE", key: "line", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "STATUS", key: "status", width: 40, type: "text", align: "right", cardSubTitle: true },
        { label: "PRINT", key: "print", width: 40, type: "text", align: "right", cardSubTitle: true },
    ];

    const exportFilename = "spk.csv";

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
