import { useEffect } from "react";
import { FaHandshake } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const DefaultCostList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Default Cost";
  const img = <FaHandshake className="module-img" />;
  const path = "/cost-management/default-cost";
  const url = "defaultCost";
  const role = "Cost Management - Default Cost";

  const columns = [
    { label: "Customer", key: "customerID", width: 100, type: "customer" },
    { label: "Origin", key: "originID", width: 100, type: "origin" },
    { label: "Destination", key: "destinationID", width: 100, type: "destination" },
    { label: "Fleet Type", key: "fleetTypeID", width: 100, type: "fleetType" },
  ];

  const exportFilename = "DefaultCost.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

DefaultCostList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(DefaultCostList);
