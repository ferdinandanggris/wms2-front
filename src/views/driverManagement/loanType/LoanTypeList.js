import { useEffect } from "react";
import { FaHandshake } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const LoanTypeList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Loan Type";
  const img = <FaHandshake className="module-img" />;
  const path = "/driver-management/loan-type";
  const url = "loanType";
  const role = "Driver Management - Loan Type";

  const columns = [{ label: "Name", key: "name", width: 100, type: "name", cardTitle: true }];

  const exportFilename = "LoanType.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

LoanTypeList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(LoanTypeList);
