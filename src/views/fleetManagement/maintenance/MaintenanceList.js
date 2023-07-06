import { useEffect } from "react";
import { FaHandshake } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const MaintenanceList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Maintenance";
  const img = <FaHandshake className="module-img" />;
  const path = "/fleet-management/maintenance";
  const url = "maintenance";
  const role = "Fleet Management - Maintenance";

  const columns = [
    { label: "Voucher No", key: "voucherNo", width: 100 },
    { label: "Maintenance Date", key: "transDate", width: 100, type: "date" },
    { label: "Next Date", key: "nextDate", width: 100, type: "date" },
    { label: "Fleet", key: "fleetID", width: 100, type: "fleet" },
    { label: "Account", key: "accountID", width: 100, type: "account" },
    { label: "Amount", key: "amount", width: 100, type: "number", align: "right" },
  ];

  const exportFilename = "Maintenance.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

MaintenanceList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(MaintenanceList);
