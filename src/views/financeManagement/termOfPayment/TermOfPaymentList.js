import { useEffect } from "react";
import { FaFile } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const TermOfPaymentList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Term Of Payment";
  const img = <FaFile className="module-img" />;
  const path = "/finance-management/term-of-payment";
  const url = "termOfPayment";
  const role = "Finance Management - Term Of Payment";

  const columns = [
    { label: "Name", key: "name", width: 100, cardTitle: true },
    { label: "Value", key: "value", width: 100, type: "number", cardSubTitle: true },
  ];

  const exportFilename = "termOfPayment.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

TermOfPaymentList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(TermOfPaymentList);
