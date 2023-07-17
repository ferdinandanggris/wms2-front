import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const GroupList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Group";
  const img = <FaLayerGroup className="module-img" />;
  const path = "/master/group";
  const url = "group";
  const role = "Master - Group";

  const columns = [
    { label: "Code", key: "code", width: 100, align: "left", cardTitle: true },
    { label: "Name", key: "name", width: 100, align: "left", cardTitle: true },
    { label: "Warehouse", key: "warehouseId", align: "left", width: 100, cardTitle: true },
  ];

  const exportFilename = "Group.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  const customRenderValue = (col, value, item) => {
    if (col.key == "warehouseId") {
      return item.warehouse.name;
    }
  };


  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} customRenderValue={customRenderValue} />;
};

GroupList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(GroupList);
