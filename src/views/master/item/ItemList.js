import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const Item = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Item";
  const img = <FaLayerGroup className="module-img" />;
  const path = "/master/item";
  const url = "Item";
  const role = "Master - Item Type";

  const columns = [
    { label: "Name", key: "name", width: 100, cardTitle: true },
    { label: "CODE", key: "code", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "UOM", key: "uomId", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "PACKING", key: "packingId", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "QTY PER PACKING", key: "qtyPerPacking", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "INITIAL", key: "initial", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "INCOMING", key: "incoming", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "OUTGOING", key: "outgoing", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "BALANCE", key: "balance", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "STATUS", key: "maxTemp", width: 80, type: "number", align: "right", cardSubTitle: true },
  ];

  const exportFilename = "item-type.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

Item.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(Item);
