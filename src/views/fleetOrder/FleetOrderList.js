import { useEffect } from "react";
import { FaRoute } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../actions/data";

const FleetOrderList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Fleet Order";
  const img = <FaRoute className="module-img" />;
  const path = "/fleet-order";
  const url = "fleetOrder";
  const role = "Fleet Order";

  const columns = [
    { label: "FO Number", key: "voucherNo", width: 100 },
    { label: "Delivery Plan", key: "deliveryTime", width: 100, type: "datetime" },
    { label: "Start Time", key: "startTime", width: 100, type: "datetime" },
    { label: "End Time", key: "endTime", width: 100, type: "datetime" },
    { label: "Fleet", key: "fleetID", width: 100, type: "fleet" },
    { label: "Asigned Driver", key: "driverID", width: 100, type: "driver" },
    { label: "Status", key: "status", width: 100 },
    { label: "Print", key: "voucherNo", width: 70, type: "print", url: "print?voucherNo=", align: "center", link: false },
  ];

  const exportFilename = "fleet-order.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

FleetOrderList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(FleetOrderList);
