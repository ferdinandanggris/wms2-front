import { useEffect } from "react";
import { FaCarSide } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../actions/data";

const DeliveryList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Delivery Order";
  const img = <FaCarSide className="module-img" />;
  const path = "/order";
  const url = "order";
  const role = "Order - Delivery";

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

  const exportFilename = "delivery.csv";
  const condition = { status: "DELIVERY" };

  useEffect(() => {
    if (user !== null) {
      refreshData({ url, filterSearch: condition });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} filterDate={true} allowAdd={false} allowDelete={false} condition={condition} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

DeliveryList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(DeliveryList);
