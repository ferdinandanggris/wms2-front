import { useEffect } from "react";
import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const RecivingList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Reciving List";
  const img = <FaLayerGroup className="module-img" />;
  const path =  "/transaction/receiving";
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
  }, [user, refreshData]);

  const customRenderValue = (col, value, item) => {
    if (col.key == "status") {
        if (value == "Y")
            return (<h6 className="pb-1 pt-1 m-0 text-center"><div className="badge badge-pill badge-success">POSTED</div></h6 >);
        else
            return (<h6 className="pb-1 pt-1 m-0 text-center"><div className="badge badge-pill badge-success">WAITING</div></h6 >);
    }
};

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData}  customRenderValue={customRenderValue} />;
};


RecivingList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(RecivingList);