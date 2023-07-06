import { useEffect } from "react";
import { FaBox } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const ProductList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Product";
  const img = <FaBox className="module-img" />;
  const path = "/master/product";
  const url = "product";
  const role = "Master - Product";

  const columns = [
    { label: "Name", key: "name", width: 100, cardTitle: true },
    { label: "Unit Price", key: "unitPrice", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "Weight (kg)", key: "weight", width: 80, type: "number", decimals: 2, align: "right" },
    { label: "Volume (cbm)", key: "volume", width: 80, type: "number", decimals: 2, align: "right" },
    { label: "Dimention (mm)", key: "size", width: 80, type: "number", decimals: 2, align: "right" },
  ];

  const exportFilename = "product.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

ProductList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(ProductList);
