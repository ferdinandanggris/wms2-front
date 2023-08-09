import { useEffect } from "react";
import { FaCcMastercard, FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";
import { loadUom, loadUser, loadVendor } from "../../../actions/master";
import { propTypes } from "react-bootstrap/esm/Image";

const RecivingList = ({ user, data, refreshData, deleteData, exportData, loadVendor, loadUser, master }) => {
  const title = "Reciving List";
  const img = <FaLayerGroup className="module-img" />;
  const path = "/transaction/receiving";
  const url = "Receiving";
  const role = "transaction- RecivingList";

  const columns = [
    { label: "VOUCHER #", key: "voucherNo", width: 100, cardTitle: true },
    { label: "REFERENCE #", key: "referenceNo", width: 80, type: "number", align: "left", cardSubTitle: true },
    { label: "VENDOR", key: "vendors", width: 80, align: "left", cardSubTitle: true },
    { label: "CREATED BY ", key: "userIn", width: 80, align: "left", cardSubTitle: true },
    { label: "CREATED DATE ", key: "dateIn", width: 80, type: "number", align: "left", cardSubTitle: true },
    { label: "POSTED BY", key: "postedBy", width: 80, type: "number", align: "left", cardSubTitle: true },
    { label: "POSTED DATE", key: "postDate", width: 80, type: "number", align: "left", cardSubTitle: true },
    { label: "STATUS", key: "status", width: 80, type: "custom", align: "left", cardSubTitle: true },
  ];

  const exportFilename = "item-type.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
    loadVendor();
    loadUser();
  }, [user, refreshData, loadVendor,loadUser]);

  const customRenderValue = (col, value, item) => {
    if (col.key == "status") {
      if (value == "Y")
        return (<h6 className="pb-1 pt-1 m-0 text-center"><div className="badge badge-pill badge-success">POSTED</div></h6 >);
      else
        return (<h6 className="pb-1 pt-1 m-0 text-center"><div className="badge badge-pill badge-success">WAITING</div></h6 >);
    } else if (col.key === "vendors") {
      if (master.vendor !== null && master.vendor !== undefined) {
        if(value) {
          const tempVendor = master.vendor.find((obj) => obj.id === value.id);
          return tempVendor.name;
        } else {
          return "";
        }
      }
    } else if (col.key === "userIn") {
      if (master.user !== null && master.user !== undefined) {
        if(value) {
          const tempUser = master.user.find((obj) => obj.id === value);
          return tempUser.fullName;
        } else {
          return "";
        }
      }
    };
  }

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} customRenderValue={customRenderValue} />;
};


RecivingList.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  refreshData: PropTypes.func,
  loadVendor: PropTypes.func,
  loadUser:PropTypes.func,
  deleteData: PropTypes.func,
  exportData: PropTypes.func,
  master: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { refreshData, deleteData, exportData, loadVendor, loadUser })(RecivingList);