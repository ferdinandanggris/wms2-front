import { useEffect } from "react";
import { FaShippingFast } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../actions/data";
import { setOrderStatus } from "../../actions/ice";

const OrderList = ({ user, data, refreshData, deleteData, exportData, setOrderStatus }) => {
  const title = "All Order";
  const img = <FaShippingFast className="module-img" />;
  const path = "/order";
  const url = "order";
  const role = "Order - List";

  const columns = [
    { label: "Order No", key: "voucherNo", width: 100, cardTitle: true },
    { label: "Reference No", key: "referenceNo", width: 100 },
    { label: "Batch No", key: "batchNo", width: 100 },
    { label: "Route Type", key: "routeType", width: 100 },
    { label: "Departure Date", key: "departureDate", width: 100, type: "datetime", cardSubTitle: true },
    { label: "Customer", key: "customerID", width: 100, type: "customer", cardSubTitle: true },
    { label: "Origin", key: "originID", width: 100, type: "origin" },
    { label: "Destination", key: "destinationID", width: 100, type: "destination" },
    { label: "Category", key: "fleetCategoryID", width: 100, type: "fleetCategory" },
    { label: "Type", key: "fleetTypeID", width: 100, type: "fleetType" },
    { label: "Route", key: "routeID", width: 100, type: "route" },
    { label: "Item", key: "itemTypeID", width: 100, type: "itemType" },
    { label: "Status", key: "status", width: 100 },
  ];

  const exportFilename = "order.csv";
  const bulkAction = [
    { title: "Draft", type: "draft" },
    { title: "Confirm", type: "confirm" },
    { title: "Pick Up", type: "pickup" },
    { title: "In Hub", type: "in hub" },
    { title: "Delivery", type: "delivery" },
    { title: "Close", type: "close" },
    { title: "Cancel", type: "cancel" },
  ];

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  const handleBulkAction = async (e, type, id) => {
    e.preventDefault();

    let status = "";
    if (type === "draft") {
      status = "DRAFT";
    } else if (type === "confirm") {
      status = "CONFIRMED";
    } else if (type === "pickup") {
      status = "PICKUP";
    } else if (type === "in hub") {
      status = "INHUB";
    } else if (type === "delivery") {
      status = "DELIVERY";
    } else if (type === "close") {
      status = "CLOSE";
    } else if (type === "cancel") {
      status = "CANCELED";
    }
    await setOrderStatus({ id, status }).then(() => {
      refreshData({ url });
    });
  };

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} filterDate={true} allowAdd={false} allowDelete={false} bulkAction={bulkAction} handleBulkAction={handleBulkAction} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

OrderList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData, setOrderStatus })(OrderList);
