import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const PalletList = ({ user, data, refreshData, deleteData, exportData }) => {
    const title = "Pallet";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/master/pallet";
    const url = "Pallet";
    const role = "Master - Pallet";

    const columns = [
        { label: "CODE", key: "code", width: 40,  type: "number", align: "left", cardTitle: true },
        { label: "NAME", key: "name", width: 40, type: "number", align: "right", cardSubTitle: true },
        { label: "TYPE", key: "type", width: 40, type: "number", align: "right", cardSubTitle: true },
        { label: "CAPACITY", key: "capacity", width: 40, type: "number", align: "right", cardSubTitle: true },
        { label: "TARE", key: "tare", width: 40, type: "number", align: "right", cardSubTitle: true },
    ];

    const exportFilename = "item-type.csv";

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

PalletList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(PalletList);
