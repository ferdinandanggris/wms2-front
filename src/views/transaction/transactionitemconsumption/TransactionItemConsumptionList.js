import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const TransactionItemConsumptionList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Transaction ItemConsumption List";
  const img = <FaLayerGroup className="module-img" />;
  const path =  "/transaction/non-komersil";
  const url = "ItemConsumption";
  const role = "transaction- TransactionItemConsumptionList";

  const columns = [
    { label: "VOUCHER #", key: "voucherNo", width: 100, cardTitle: true },
    { label: "REFERENCE #", key: "referenceNo", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "CUSTOMER", key: "customerName", width: 100, cardTitle: true },
    { label: "type", key: "type", width: 100, cardTitle: true },
    { label: "CREATED BY", key: "createdBy", width: 100, cardTitle: true },
    { label: "CREATED DATE ", key: "transDate", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "POSTED BY", key: "postedBy", width: 100, cardTitle: true },
    { label: "POSTED DATE", key: "postDate", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "LINE", key: "balance", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "STATUS", key: "status", width: 80, type: "number", align: "right", cardSubTitle: true },
  ];

  const exportFilename = "item-type.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

TransactionItemConsumptionList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(TransactionItemConsumptionList);