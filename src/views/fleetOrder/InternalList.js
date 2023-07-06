import { useEffect } from "react";
import { FaTruckMoving } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../actions/data";
import { setFleetOrderStatus } from "../../actions/ice";

const FleetOrderInternalList = ({ user, data, refreshData, deleteData, exportData, setFleetOrderStatus }) => {
  const title = "Fleet Order Internal";
  const img = <FaTruckMoving className="module-img" />;
  const path = "/fleet-order/int";
  const url = "fleetOrder";
  const role = "Fleet Order Internal";

  const columns = [
    { label: "FO Number", key: "voucherNo", width: 100, cardTitle: true },
    { label: "Delivery Plan", key: "deliveryTime", width: 100, type: "datetime", cardSubTitle: true },
    { label: "Start Time", key: "startTime", width: 100, type: "datetime" },
    { label: "End Time", key: "endTime", width: 100, type: "datetime" },
    { label: "Fleet", key: "fleetNo", width: 100, cardSubTitle: true },
    { label: "Asigned Driver", key: "driverName", width: 100 },
    { label: "Status", key: "status", width: 100 },
    { label: "Print", key: "voucherNo", width: 70, type: "print", url: "print?voucherNo=", align: "center", link: false },
  ];

  const exportFilename = "fleet-order.csv";
  const condition = { type: "INTERNAL" };
  const bulkAction = [
    { title: "New", type: "new" },
    { title: "Confirm", type: "confirm" },
    { title: "Start", type: "start" },
    { title: "Delivered", type: "delivered" },
    { title: "Cancel", type: "cancel" },
  ];

  useEffect(() => {
    if (user !== null) {
      refreshData({ url, filterSearch: condition });
    }
  }, [user, refreshData]);

  const handleBulkAction = async (e, type, id) => {
    e.preventDefault();

    let status = "";
    if (type === "new") {
      status = "NEW";
    } else if (type === "confirm") {
      status = "CONFIRMED";
    } else if (type === "start") {
      status = "STARTED";
    } else if (type === "delivered") {
      status = "DELIVERED";
    } else if (type === "cancel") {
      status = "CANCELED";
    }
    await setFleetOrderStatus({ id, status }).then(() => {
      refreshData({ url, filterSearch: condition });
    });
  };

  return <ListWrapper img={img} title={title} filterDate={true} allowDelete={false} bulkAction={bulkAction} handleBulkAction={handleBulkAction} condition={condition} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

FleetOrderInternalList.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  refreshData: PropTypes.func,
  deleteData: PropTypes.func,
  exportData: PropTypes.func,
  setFleetOrderStatus: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
});

export default connect(mapStateToProps, { refreshData, deleteData, exportData, setFleetOrderStatus })(FleetOrderInternalList);
