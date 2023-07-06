import { useEffect } from "react";
import { FaMap } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const AddressList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Address";
  const img = <FaMap className="module-img" />;
  const path = "/customer-management/address";
  const url = "address";
  const role = "Customer Management - Address";

  const columns = [
    { label: "Customer", key: "customerID", width: 100, type: "customer", cardTitle: true },
    { label: "Name", key: "name", width: 200, cardSubTitle: true },
    { label: "Address", key: "addressName", width: 200 },
    { label: "Sector", key: "sectorID", width: 100, type: "sector" },
    { label: "Province", key: "province", width: 100 },
    { label: "City", key: "city", width: 100 },
    { label: "Postal Code", key: "postalCode", width: 100 },
    { label: "Contact Person", key: "contactPerson", width: 100 },
    { label: "Phone", key: "phoneNo", width: 100 },
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
