import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";
import { loadVendor } from "../../../actions/master";

const RawMaterialReceivingList = ({ user, data, refreshData, deleteData, exportData, master, loadVendor }) => {
  const title = "Raw Material Receiving List";
  const img = <FaLayerGroup className="module-img" />;
  const path = "/transaction-rm/raw-material-receiving";
  const url = "RawMaterialReceiving";
  const role = "Transaction - Raw Material Receiving";

  const columns = [
    { label: "CODE", key: "vendorId", width: 80, align: "right", cardSubTitle: true },
    { label: "VOUCHER#", key: "voucherNo", width: 100, cardTitle: true },
    { label: "REFERENCE#", key: "referenceNo", width: 80, align: "right", cardSubTitle: true },
    { label: "VENDOR", key: "vendorName", width: 80, align: "right", cardSubTitle: true },
    { label: "CREATED BY", key: "createdBy", width: 80, align: "right", cardSubTitle: true },
    { label: "CREATED DATE", key: "dateIn", width: 80, align: "right", cardSubTitle: true },
    { label: "POSTED BY", key: "postedBy", width: 80, align: "right", cardSubTitle: true },
    { label: "POSTED Date", key: "postDate", width: 80, align: "right", cardSubTitle: true },
    { label: "LINE", key: "", width: 80, align: "right", cardSubTitle: true },
    { label: "STATUS", key: "status", width: 80, align: "right", cardSubTitle: true },
  ];

  const exportFilename = "Raw-Material-Receiving.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
    loadVendor();
  }, [user, refreshData, loadVendor]);

  const customRenderValue = (col, value, item) => {
    if (col.key === "vendorId") {
      if (master.vendor !== null && master.vendor !== undefined) {
        if (value) {
          const tempVendor = master.vendor.find((obj) => obj.id === value);
          return tempVendor ? tempVendor.code : "";
        } else {
          return "";
        }
      }
    } else if (col.key === "vendorName") {
      if (master.vendor !== null && master.vendor !== undefined) {
        const tempVendor = master.vendor.find((obj) => obj.id === item.vendorId);
        return tempVendor ? tempVendor.name : "";
      }
    }
  };


  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} customRenderValue={customRenderValue} />;
};

RawMaterialReceivingList.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  master: PropTypes.object,
  refreshData: PropTypes.func,
  deleteData: PropTypes.func,
  exportData: PropTypes.func,
  loadVendor: PropTypes.func
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { refreshData, deleteData, exportData, loadVendor })(RawMaterialReceivingList);