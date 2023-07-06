import { useEffect } from "react";
import { FaFileInvoice } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const InvoiceList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Invoice";
  const img = <FaFileInvoice className="module-img" />;
  const path = "/finance-management/invoice";
  const url = "invoice";
  const role = "Finance Management - Invoice";

  const columns = [
    { label: "Invoice No", key: "invoiceNo", width: 100, cardTitle: true },
    { label: "Reference No", key: "referenceNo", width: 100 },
    { label: "Customer", key: "customer", width: 100, type: "customer", cardSubTitle: true },
    { label: "Date", key: "transDate", width: 100, type: "date", cardSubTitle: true },
    { label: "Due No", key: "dueDate", width: 100, type: "date" },
    { label: "Netto", key: "netto", width: 80, type: "number", align: "right" },
  ];

  const exportFilename = "invoice.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

InvoiceList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(InvoiceList);
