import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";
import { loadWarehouse } from "../../../actions/master";

const LocationList = ({ user, data, refreshData, deleteData, exportData, master, loadWarehouse }) => {

    const title = "Location";
    const img = <FaLayerGroup className="module-img" />;
    const path = "/master/location";
    const url = "location";
    const role = "Master - Location";

    const columns = [
        { label: "CODE", key: "code", width: 40, type: "number", align: "left", cardTitle: true },
        { label: "NAME", key: "name", width: 40, type: "number", align: "left", cardSubTitle: true },
        { label: "WAREHOUSES", key: "warehouseId", width: 40, align: "left", cardSubTitle: true },
        { label: "REMARK", key: "remark", width: 40, type: "number", align: "left", cardSubTitle: true },
        { label: "CAPACITY", key: "capacity", width: 40, type: "number", align: "right", cardSubTitle: true },
        { label: "INITIAL", key: "initial", width: 40, type: "number", align: "right", cardSubTitle: true },
        { label: "INCOMING", key: "incoming", width: 40, type: "number", align: "right", cardSubTitle: true },
        { label: "OUTGOING", key: "outgoing", width: 40, type: "number", align: "right", cardSubTitle: true },
        { label: "BALANCE", key: "balance", width: 40, type: "number", align: "right", cardSubTitle: true },
    ];

    const exportFilename = "Location.csv";

    useEffect(() => {
        if (user !== null) {
            refreshData({ url });
        }
        loadWarehouse();
    }, [user, refreshData, loadWarehouse]);

    const customRenderValue = (col, value, item) => {
        if (col.key === "warehouseId") {
            if (master.warehouse !== null && master.warehouse !== undefined) {
                if (value) {
                    const tempWarehouse = master.warehouse.find((obj) => obj.id === value);
                    return tempWarehouse.name;
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

LocationList.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    master: PropTypes.object,
    refreshData: PropTypes.func,
    deleteData: PropTypes.func,
    exportData: PropTypes.func,
    loadWarehouse: PropTypes.func,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.data,
    master: state.master,
});

export default connect(mapStateToProps, { refreshData, deleteData, exportData, loadWarehouse })(LocationList);
