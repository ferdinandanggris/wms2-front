import { useEffect } from "react";
import { FaUserFriends } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const DriverList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Driver";
  const img = <FaUserFriends className="module-img" />;
  const path = "/driver-management/driver";
  const url = "driver";
  const role = "Driver Management - Driver";

  const columns = [
    { label: "Name", key: "name", width: 100, cardTitle: true },
    { label: "Mobile 1", key: "mobileNo1", width: 100, cardSubTitle: true },
    { label: "Mobile 2", key: "mobileNo2", width: 100, cardSubTitle: true },
    { label: "Account No", key: "accountNo", width: 100 },
    { label: "Bank", key: "bankName", width: 100 },
    { label: "Identity", key: "identityNo", width: 100 },
    { label: "License", key: "driverLicense", width: 100 },
    { label: "Expired", key: "expiredDate", width: 100, type: "date" },
  ];

  const exportFilename = "driver.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

DriverList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(DriverList);
