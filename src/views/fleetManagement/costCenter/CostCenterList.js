import { useEffect } from "react";
import { FaHandshake } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const CostCenterList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Cost Center";
  const img = <FaHandshake className="module-img" />;
  const path = "/fleet-management/cost-center";
  const url = "costCenter";
  const role = "Fleet Management - Cost Center";

  const columns = [{ label: "Description", key: "description", width: 100, type: "description", cardTitle: true }];

  const exportFilename = "CostCenter.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

CostCenterList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(CostCenterList);
