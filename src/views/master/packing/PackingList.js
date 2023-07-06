import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const PackingList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Packing";
  const img = <FaLayerGroup className="module-img" />;
  const path = "/master/packing";
  const url = "packing";
  const role = "Master - Packing";

  const columns = [
    { label: "Name", key: "name", width: 100, cardTitle: true },
    { label: "Remark", key: "remark", width: 100, cardTitle: true },
  ];

  const exportFilename = "Packing.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

PackingList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(PackingList);
