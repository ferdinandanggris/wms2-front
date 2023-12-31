import { useEffect } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const VendorList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Vendor";
  const img = <FaChalkboardTeacher className="module-img" />;
  const path = "/master/vendor";
  const url = "vendor";
  const role = "Master - Vendor";

  const columns = [
    { label: "Code", key: "code", width: 100, cardTitle: true },
    { label: "Name", key: "name", width: 100, cardTitle: true },
    { label: "Kategori", key: "kategori", width: 100, cardTitle: true },
  ];

  const exportFilename = "Vendor.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

VendorList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(VendorList);
