import {useEffect} from "react";
import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../actions/data";

const RawMaterialBatchReceivingList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Raw Material Receiving List";
  const img = <FaLayerGroup className="module-img" />;
  const path ="/transaction-rm/raw-material-receiving";
  const url = "RawMaterialBatch";
  const role = "transaction -RawMaterialBatchReceivingList";

  const columns = [
    { label: "CODE", key: "code", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "VOUCHER#", key: "", width: 100, cardTitle: true },
    { label: "REFERENCE#", key: "", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "VENDOR", key: "", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "CREATED BY", key: "", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "CREATED DATE", key: "", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "POSTED BY", key: "", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "POSTED Date", key: "", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "LINE", key: "", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "STATUS", key: "status", width: 80, type: "number", align: "right", cardSubTitle: true },
  ];

  const exportFilename = "item-type.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} />;
};

RawMaterialBatchReceivingList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(RawMaterialBatchReceivingList);