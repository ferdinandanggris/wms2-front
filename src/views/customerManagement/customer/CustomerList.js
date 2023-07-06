import { useEffect } from "react";
import { FaUserFriends } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const CustomerList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Customer";
  const img = <FaUserFriends className="module-img" />;
  const path = "/customer-management/customer";
  const url = "customer";
  const role = "Customer Management - Customer";

  const columns = [
    { label: "Name", key: "name", width: 100, cardTitle: true },
    { label: "Phone", key: "phoneNo", width: 100, cardSubTitle: true },
    { label: "Email", key: "email", width: 100, cardSubTitle: true },
    { label: "Company", key: "companyName", width: 100 },
    { label: "Category", key: "categoryID", width: 100, type: "category" },
    { label: "Industry", key: "industryID", width: 100, type: "industry" },
  ];

  const exportFilename = "customer.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

CustomerList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(CustomerList);
