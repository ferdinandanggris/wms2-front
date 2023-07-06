import { useEffect } from "react";
import { FaBuilding } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const IndustryList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Industry";
  const img = <FaBuilding className="module-img" />;
  const path = "/customer-management/industry";
  const url = "industry";
  const role = "Customer Management - Industry";

  const columns = [{ label: "Description", key: "description", width: 100, cardTitle: true }];

  const exportFilename = "industry.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

IndustryList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(IndustryList);
