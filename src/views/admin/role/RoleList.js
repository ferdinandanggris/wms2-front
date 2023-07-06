import { useEffect } from "react";
import { FaUserLock } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const RoleList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Role";
  const img = <FaUserLock className="module-img" />;
  const path = "/admin/role";
  const url = "role";
  const role = "Admin - Role";

  const columns = [{ label: "Description", key: "description", width: 100, cardTitle: true }];

  const exportFilename = "role.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

RoleList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(RoleList);
