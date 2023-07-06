import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const CategoryList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Category";
  const img = <FaLayerGroup className="module-img" />;
  const path = "/master/category";
  const url = "category";
  const role = "Master - Category";

  const columns = [
    { label: "Code", key: "code", width: 100, cardTitle: true },
    { label: "Name", key: "name", width: 100, cardTitle: true },
    { label: "Type", key: "type", width: 100, cardTitle: true },
    { label: "Is Active", key: "is_active", width: 100, cardTitle: true },
  ];

  const exportFilename = "category.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

CategoryList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(CategoryList);
