import { useEffect } from "react";
import { FaUsers } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const UserList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "User";
  const img = <FaUsers className="module-img" />;
  const path = "/admin/user";
  const url = "user";
  const role = "Admin - User";

  const columns = [
    { label: "Name", key: "fullName", width: 100, cardTitle: true },
    { label: "Username", key: "username", width: 100, cardSubTitle: true },
    { label: "Email", key: "email", width: 200 },
  ];

  const exportFilename = "user.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

UserList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(UserList);
