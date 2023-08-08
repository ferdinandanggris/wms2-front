import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../actions/data";
import { loadItem } from "../../actions/master"
const RawMaterialBatchList = ({ user, data, refreshData, deleteData, exportData, master, loadItem }) => {
  const title = "Raw Material Batch List";
  const img = <FaLayerGroup className="module-img" />;
  const path = "/transaction-rm/raw-material-batch";
  const url = "RawMaterialBatch";
  const role = "transaction -RawMaterialBatchList";

  const columns = [
    { label: "CODE", key: "code", width: 80, type: "number", align: "right", cardSubTitle: true },
    { label: "Item#", key: "itemId", label: "itemCode", width: 100, cardTitle: true },
    { label: "Item", key: "itemId", label: "itemName", width: 80, align: "right", cardSubTitle: true },
    { label: "Status", key: "status", width: 80, type: "custom", align: "right", cardSubTitle: true },
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
    loadItem();
  }, [user, refreshData, loadItem]);

  const customRenderValue = (col, value, item) => {
    if (col.key == "status") {
      if (value == "Y")
        return (<h6 className="pb-1 pt-1 m-0 text-center"><div className="badge badge-pill badge-success">Approved</div></h6 >);
      else
        return (<h6 className="pb-1 pt-1 m-0 text-center"><div className="badge badge-pill badge-success">Pending</div></h6 >);
    } else if (col.key === "itemId" && col.label === "itemCode") {
      if (master.item !== null && master.item !== undefined) {
        if (value) {
          const tempItem = master.item.find((obj) => obj.id === value);
          if (tempItem) {
            return tempItem.code;
          } else {
            return "";
          }
        } else {
          return "";
        }
      }
    }else if (col.key === "itemId" && col.label === "itemName") {
      if (master.item !== null && master.item !== undefined) {
        if (value) {
          const tempItem = master.item.find((obj) => obj.id === value);
          if (tempItem) {
            return tempItem.name;
          } else {
            return "";
          }
        } else {
          return "";
        }
      }
    };
  };

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} customRenderValue={customRenderValue} />;
};
RawMaterialBatchList.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  refreshData: PropTypes.func,
  deleteData: PropTypes.func,
  loadItem: PropTypes.func,
  exportData: PropTypes.func,
  master: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { refreshData, deleteData, exportData, loadItem })(RawMaterialBatchList);