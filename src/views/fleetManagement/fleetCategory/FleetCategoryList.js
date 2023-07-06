import { useEffect } from "react";
import { FaFile } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const FleetCategoryList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Fleet Category";
  const img = <FaFile className="module-img" />;
  const path = "/fleet-management/fleet-category";
  const url = "fleetCategory";
  const role = "Fleet Management - Fleet Category";

  const columns = [
    { label: "Description", key: "description", width: 100, cardTitle: true },
    { label: "Factor", key: "factor", width: 80, type: "number", align: "right", cardSubTitle: true },
  ];

  const exportFilename = "fleet-category.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

FleetCategoryList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(FleetCategoryList);
