import { useEffect } from "react";
import { FaListAlt } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const AccountList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Account";
  const img = <FaListAlt className="module-img" />;
  const path = "/finance-management/account";
  const url = "account";
  const role = "Finance Management - Account";

  const columns = [{ label: "Name", key: "name", width: 100, cardTitle: true }];

  const exportFilename = "termOfPayment.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

AccountList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(AccountList);
