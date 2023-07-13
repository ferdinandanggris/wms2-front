import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const ItemTypeList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Item Type";
  const img = <FaLayerGroup className="module-img" />;
  const path = "/master/item-type";
  const url = "itemtype";
  const role = "Master - Item Type";

  const columns = [
    { label: "Name", key: "name", width: 100, cardTitle: true },
    { label: "Min Temp", key: "minTemp", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "Max Temp", key: "maxTemp", width: 80, type: "number", align: "right", cardSubTitle: true },
  ];

  const exportFilename = "item-type.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

ItemTypeList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(ItemTypeList);
