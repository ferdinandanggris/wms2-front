import { useEffect } from "react";
import { FaHandshake } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const AddressList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Contract";
  const img = <FaHandshake className="module-img" />;
  const path = "/customer-management/contract";
  const url = "contract";
  const role = "Customer Management - Contract";

  const columns = [
    { label: "Customer", key: "customerID", width: 100, type: "customer", cardTitle: true },
    { label: "Start Date", key: "startDate", width: 100, type: "date", cardSubTitle: true },
    { label: "End Date", key: "endDate", width: 100, type: "date", cardSubTitle: true },
    { label: "Fleet Type", key: "fleetTypeID", width: 100, type: "fleetType" },
    { label: "Origin", key: "originID", width: 200, type: "origin" },
    { label: "Destination", key: "destinationID", width: 200, type: "destination" },
  ];

  const exportFilename = "address.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

AddressList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(AddressList);
