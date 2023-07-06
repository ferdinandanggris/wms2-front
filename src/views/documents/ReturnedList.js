import { useEffect } from "react";
import { FaCompressArrowsAlt } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../actions/data";
import { setOrderStatus } from "../../actions/ice";

const ReturnedList = ({ user, data, refreshData, deleteData, exportData, setOrderStatus }) => {
  const title = "Returned Order";
  const img = <FaCompressArrowsAlt className="module-img" />;
  const path = "/order";
  const url = "order";
  const role = "Documents - Returned";

  const columns = [
    { label: "Order No", key: "voucherNo", width: 100, cardTitle: true },
    { label: "Reference No", key: "referenceNo", width: 100 },
    { label: "Batch No", key: "batchNo", width: 100 },
    { label: "Departure Date", key: "departureDate", width: 100, type: "datetime", cardSubTitle: true },
    { label: "Customer", key: "customerID", width: 100, type: "customer", cardSubTitle: true },
    { label: "Origin", key: "originID", width: 100, type: "origin" },
    { label: "Destination", key: "destinationID", width: 100, type: "destination" },
    { label: "Category", key: "fleetCategoryID", width: 100, type: "fleetCategory" },
    { label: "Type", key: "fleetTypeID", width: 100, type: "fleetType" },
    { label: "Item", key: "itemTypeID", width: 100, type: "itemType" },
  ];

  const exportFilename = "delivered.csv";
  const condition = { status: "CLOSED", readyDate: 0 };
  const bulkAction = [{ title: "Ready", type: "ready" }];

  useEffect(() => {
    if (user !== null) {
      refreshData({ url, filterSearch: { status: "CLOSED", readyDate: 0 } });
    }
  }, [user, refreshData]);

  const handleBulkAction = async (e, type, id) => {
    e.preventDefault();

    let status = "";
    if (type === "ready") {
      status = "READY";
    }
    await setOrderStatus({ id, status }).then(() => {
      refreshData({ url, filterSearch: condition });
    });
  };

  return <ListWrapper img={img} title={title} bulkAction={bulkAction} handleBulkAction={handleBulkAction} path={path} url={url} exportFilename={exportFilename} role={role} filterDate={true} allowAdd={false} allowDelete={false} condition={condition} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

ReturnedList.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  refreshData: PropTypes.func,
  deleteData: PropTypes.func,
  exportData: PropTypes.func,
  setOrderStatus: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
});

export default connect(mapStateToProps, { refreshData, deleteData, exportData, setOrderStatus })(ReturnedList);
