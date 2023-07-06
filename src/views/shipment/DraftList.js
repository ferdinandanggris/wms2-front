import { useEffect } from "react";
import { FaCalendarDay } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../actions/data";
import { setShipmentStatus } from "../../actions/ice";

const DraftList = ({ user, data, refreshData, deleteData, exportData, setShipmentStatus }) => {
  const title = "Draft Shipment";
  const img = <FaCalendarDay className="module-img" />;
  const path = "/shipment";
  const url = "shipment";
  const role = "Shipment - Draft";

  const columns = [
    { label: "Shipment No", key: "voucherNo", width: 100, cardTitle: true },
    { label: "Reference No", key: "referenceNo", width: 100 },
    { label: "Batch No", key: "batchNo", width: 100 },
    { label: "External No", key: "externalID", width: 100 },
    { label: "Order No", key: "orderID", width: 100, type: "order" },
    { label: "Route Type", key: "routeType", width: 100 },
    { label: "Departure Date", key: "departureDate", width: 100, type: "datetime", cardSubTitle: true },
    { label: "Customer", key: "customerID", width: 100, type: "customer", cardSubTitle: true },
    { label: "Origin", key: "originID", width: 100, type: "origin" },
    { label: "Destination", key: "destinationID", width: 100, type: "destination" },
    { label: "Category", key: "fleetCategoryID", width: 100, type: "fleetCategory" },
    { label: "Type", key: "fleetTypeID", width: 100, type: "fleetType" },
    { label: "Item", key: "itemTypeID", width: 100, type: "itemType" },
    { label: "Status", key: "status", width: 100 },
  ];

  const exportFilename = "draft.csv";
  const bulkAction = [
    { title: "Confirm", type: "confirm" },
    { title: "Cancel", type: "cancel" },
  ];
  const condition = { status: "DRAFT" };

  useEffect(() => {
    if (user !== null) {
      refreshData({ url, filterSearch: condition });
    }
  }, [user, refreshData]);

  const handleBulkAction = async (e, type, id) => {
    e.preventDefault();

    let status = "";
    if (type === "draft") {
      status = "DRAFT";
    } else if (type === "confirm") {
      status = "CONFIRMED";
    } else if (type === "scheduled") {
      status = "SCHEDULED";
    } else if (type === "started") {
      status = "STARTED";
    } else if (type === "delivered") {
      status = "DELIVERED";
    } else if (type === "cancel") {
      status = "CANCELED";
    }

    await setShipmentStatus({ id, status }).then(() => {
      refreshData({ url });
    });
  };

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} filterDate={true} allowAdd={false} allowDelete={false} condition={condition} bulkAction={bulkAction} handleBulkAction={handleBulkAction} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

DraftList.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  refreshData: PropTypes.func,
  deleteData: PropTypes.func,
  exportData: PropTypes.func,

  setShipmentStatus: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
});

export default connect(mapStateToProps, { refreshData, deleteData, exportData, setShipmentStatus })(DraftList);
