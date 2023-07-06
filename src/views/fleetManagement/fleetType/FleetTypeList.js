import { useEffect } from "react";
import { FaVest } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const FleetTypeList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Fleet Type";
  const img = <FaVest className="module-img" />;
  const path = "/fleet-management/fleet-type";
  const url = "fleetType";
  const role = "Fleet Management - Fleet Type";

  const columns = [
    { label: "Description", key: "description", width: 100, cardTitle: true },
    { label: "Fleet Category", key: "fleetCategoryID", width: 100, type: "fleetCategory", cardSubTitle: true },
    { label: "Tonase", key: "tonase", width: 50, type: "number", decimals: 2, align: "right", cardSubTitle: true },
  ];

  const exportFilename = "fleet-type.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

FleetTypeList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(FleetTypeList);
