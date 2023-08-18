import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FaBox } from "react-icons/fa";
import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const RawMaterialReceivingList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Raw Material Receiving List";
  const img = <FaBox className="module-img" />;
  const path = "/transaction-rm/raw-material-receiving";
  const url = "RawMaterialReceiving";
  const role = "Transaction - Raw Material Receiving";

  const columns = [
    { label: "VOUCHER#", key: "voucherNo", width: 100, align: "left", cardTitle: true },
    { label: "REFERENCE#", key: "referenceNo", width: 80, align: "left", cardSubTitle: true },
    { label: "VENDOR", key: "vendorName", width: 80, align: "left", cardSubTitle: true },
    { label: "CREATED BY", key: "createdBy", width: 80, align: "left", cardSubTitle: true },
    { label: "CREATED DATE", key: "dateIn", width: 80, type: "datetime", align: "left", cardSubTitle: true },
    { label: "POSTED BY", key: "postedBy", width: 80, align: "left", cardSubTitle: true },
    { label: "POSTED Date", key: "postDate", width: 80, type: "datetime", align: "left", cardSubTitle: true },
    { label: "STATUS", key: "status", width: 80, type: "badge", align: "left", cardSubTitle: true },
  ];

  const exportFilename = "Raw-Material-Receiving.csv";

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }

  }, [user, refreshData]);

  const customRenderValue = (col, value, item) => {
    if (col.key === "vendorId") {
      if (item.vendor != null)
        return item.vendor.code;
      else
        return "";
    } else if (col.key === "vendorName") {
      if (item.vendor != null)
        return item.vendor.name;
      else
        return "";
    } else if (col.key == "status") {
      if (value == "Y")
        return { text: "Posted", className: "badge-success" };
      else if (value == "N")
        return { text: "Waiting", className: "badge-warning" };
      else if (value == "C")
        return { text: "Draft", className: "badge-primary" };
      else
        return "";
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

};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
});

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(RawMaterialReceivingList);