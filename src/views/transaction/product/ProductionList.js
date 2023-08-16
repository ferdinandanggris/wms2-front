import { useEffect } from "react";
import { FaBox } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import ListWrapper from "../../../components/Wrapper/ListWrapper";
import { refreshData, deleteData, exportData } from "../../../actions/data";

const ProductionList = ({ user, data, refreshData, deleteData, exportData }) => {
  const title = "Production List";
  const img = <FaBox className="module-img" />;
  const path = "/transaction/production";
  const url = "Production";
  const role = "transaction-ProductionList";

  const columns = [
    { label: "VOUCHER #", key: "voucherNo", width: 100, cardTitle: true },
    { label: "RECEIVING DATE", key: "receivingDate", width: 80, type: "datetime", align: "left", cardSubTitle: true },
    { label: "CREATED BY ", key: "createdBy", width: 80, type: "text", align: "left", cardSubTitle: true },
    { label: "STATUS", key: "status", width: 80, type: "badge", align: "left", cardSubTitle: true },
  ];

  const exportFilename = "item-type.csv";

  const customRenderValue = (col, value, item) => {
    if (col.key == "status") {
      if (value == "Y")
        return "Completed";
      else if (value == "N")
        return "Incomplete";
      else if (value == "C")
        return "Closed";
      else
        return "";

    }

  };

  useEffect(() => {
    if (user !== null) {
      refreshData({ url });
    }
  }, [user, refreshData]);

  return <ListWrapper img={img} title={title} path={path} url={url} exportFilename={exportFilename} role={role} columns={columns} data={data} refreshData={refreshData} exportData={exportData} deleteData={deleteData} customRenderValue={customRenderValue} />;
};

ProductionList.propTypes = {
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

export default connect(mapStateToProps, { refreshData, deleteData, exportData })(ProductionList);