import { useEffect } from "react";
import { FaReceipt } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const PaymentList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Payment";
  const img = <FaReceipt className="module-img" />;
  const path = "/finance-management/payment";
  const url = "payment";
  const role = "Finance Management - Payment";

  const columns = [
    { label: "Payment No", key: "paymentNo", width: 100, cardTitle: true },
    { label: "Customer", key: "customer", width: 100, type: "customer", cardSubTitle: true },
    { label: "Date", key: "transDate", width: 100, type: "date", cardSubTitle: true },
    { label: "Netto", key: "netto", width: 80, type: "number", align: "right", decimals: 0 },
  ];

  const exportFilename = "payment.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

PaymentList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(PaymentList);
