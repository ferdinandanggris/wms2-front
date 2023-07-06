import { useEffect } from "react";
import { FaHandshake } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const DriverLoanList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Driver Loan";
  const img = <FaHandshake className="module-img" />;
  const path = "/driver-management/driver-loan";
  const url = "driverLoan";
  const role = "Driver Management - Driver Loan";

  const columns = [
    { label: "Voucher No", key: "voucherNo", width: 100, cardTitle: true },
    { label: "Driver", key: "driverID", width: 100, type: "driver", cardSubTitle: true },
    { label: "Loan Type", key: "loanTypeID", width: 100, type: "loanType" },
    { label: "Amount", key: "amount", width: 100, type: "number", cardSubTitle: true, align: "right" },
  ];

  const exportFilename = "DriverLoan.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

DriverLoanList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(DriverLoanList);
