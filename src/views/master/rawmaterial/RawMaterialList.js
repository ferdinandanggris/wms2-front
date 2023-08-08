import {useEffect} from "react";
import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";
import { loadUom } from "../../../actions/master";

const RawMaterialList = ({ user, data, refreshData, deleteData, exportData,loadUom, master }) => {
  const title = "Raw Material List";
  const img = <FaLayerGroup className="module-img" />;
  const path =  "/master/raw-material";
  const url = "RawMaterial";
  const role = "Master - rawMaterial";

  const columns = [
    { label: "CODE", key: "code", width: 80, type: "number", align: "left", cardSubTitle: true },
    { label: "Name", key: "name", width: 100, align: "left", cardTitle: true },
    { label: "UOM", key: "uom", width: 80,  align: "left", cardSubTitle: true },
    { label: "PACKING", key: "packingId", width: 80, type: "number", align: "left", cardSubTitle: true },
    { label: "QTY PER PACKING", key: "qtyPerPacking", width: 80, type: "number", align: "left", cardSubTitle: true },
    { label: "INITIAL", key: "initial", width: 80, type: "number", align: "left", cardSubTitle: true },
    { label: "INCOMING", key: "incoming", width: 80, type: "number", align: "left", cardSubTitle: true },
    { label: "OUTGOING", key: "outgoing", width: 80, type: "number", align: "left", cardSubTitle: true },
    { label: "BALANCE", key: "balance", width: 80, type: "number", align: "left", cardSubTitle: true },
    { label: "STATUS", key: "isActive", width: 80, type: "custom", align: "left", cardSubTitle: true },
];

  const exportFilename = "item-type.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
    loadUom();
  }, [user, refreshData, loadUom]);

  const customRenderValue = (col, value, item) => {
    if (col.key == "isActive") {
      if (value == 0)
        return (<h6 className="pb-1 pt-1 m-0 text-center"><div className="badge badge-pill badge-success">In Active</div></h6 >);
      else
        return (<h6 className="pb-1 pt-1 m-0 text-center"><div className="badge badge-pill badge-success">Active</div></h6 >);
    } else if (col.key === "uom") {
      if (master.uom !== null && master.uom !== undefined) {
        console.log(value)
        if (value) {
          const tempUom = master.uom.find((obj) => obj.id === value.id);
          console.log(tempUom)
          return tempUom.name;
        } else {
          return "";
        }
      }
    };
  };

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} customRenderValue={customRenderValue} />;
};
RawMaterialList.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  refreshData: PropTypes.func,
  deleteData: PropTypes.func,
  exportData: PropTypes.func,
  loadUom: PropTypes.func,
  master: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { refreshData, deleteData, exportData,loadUom })(RawMaterialList);