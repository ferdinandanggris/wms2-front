import { useEffect } from "react";
import { FaDesktop } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const GateList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Gate";
  const img = <FaDesktop className="module-img" />;
  const path = "/master/gate";
  const url = "gate";
  const role = "Master - Gate";

  const columns = [
    { label: "Gate", key: "code", width: 100, cardTitle: true },
    { label: "Name", key: "name", width: 100, cardTitle: true },
  ];

  const exportFilename = "gate.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

GateList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(GateList);
