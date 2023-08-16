import { useEffect } from "react";
import { FaHome } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";
import { ProgressBar } from "react-bootstrap";

const WarehouseList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Warehouses";
  const img = <FaHome className="module-img" />;
  const path = "/master/warehouse";
  const url = "warehouse";
  const role = "Master - Warehouse";

  const columns = [
    { label: "Code", key: "code", width: 100, cardTitle: true },
    { label: "Name", key: "name", width: 100, cardTitle: true },
    { label: "Occupancy", key: "occupancy", type: "number", width: 100, cardTitle: true },
    { label: "Percentage", key: "percentage", width: 100, cardTitle: true },
  ];

  const exportFilename = "Warehouse.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);


  const customRenderValue = (col, value, item) => {
    if (col.key == "percentage") {
      return (
        <ProgressBar now={item.percentage} label={item.percentage + "%"} />
      );
    }
  };

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} customRenderValue={customRenderValue} />;
};

WarehouseList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(WarehouseList);
