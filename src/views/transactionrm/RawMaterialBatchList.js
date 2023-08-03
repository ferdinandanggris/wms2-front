import {useEffect} from "react";
import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../actions/data";

const RawMaterialBatchList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Raw Material Batch List";
  const img = <FaLayerGroup className="module-img" />;
  const path = "/transaction-rm/raw-material-batch";
  const url = "RawMaterialBatch";
  const role = "transaction -RawMaterialBatchList";

  const columns = [
    { label: "CODE", key: "code", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "Item#", key: "itemId", width: 100, cardTitle: true },
    { label: "Item", key: "uomId", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "Status", key: "status", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "INITIAL", key: "initial", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "INCOMING", key: "incoming", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "OUTGOING", key: "outgoing", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "BALANCE", key: "balance", width: 80, type: "number", align: "right", cardSubTitle: true },
  ];

  const exportFilename = "item-type.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

RawMaterialBatchList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(RawMaterialBatchList);