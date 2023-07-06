import { useEffect } from "react";
import { FaTruck } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const FleetList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Fleet";
  const img = <FaTruck className="module-img" />;
  const path = "/fleet-management/fleet";
  const url = "fleet";
  const role = "Fleet Management - Fleet";

  const columns = [
    { label: "Police No", key: "policeNo", width: 100, cardTitle: true },
    { label: "Fleet Category", key: "fleetCategoryID", width: 80, type: "fleetCategory", cardSubTitle: true },
    { label: "Fleet Type", key: "fleetTypeID", width: 80, type: "fleetType", cardSubTitle: true },
  ];

  const exportFilename = "product.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

FleetList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(FleetList);
