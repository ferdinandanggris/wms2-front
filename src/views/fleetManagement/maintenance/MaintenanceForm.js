import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";

import { FaPlus, FaTimes } from "react-icons/fa";

import { FaLayerGroup } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadAccount, loadFleet, loadCostCenter } from "../../../actions/ice";
import DatePicker from "react-datepicker";
import Select2 from "../../../components/Select2";
import { NumericFormat } from "react-number-format";
import moment from "moment";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";

const MaintenanceForm = ({ user, data, loadData, addData, editData, master, loadAccount, loadFleet, loadCostCenter }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "Maintenance";
  const img = <FaLayerGroup className="module-img" />;
  const path = "/fleet-management/maintenance";
  const url = "maintenance";
  const role = "Fleet Management - Maintenance";

  const [formData, setFormData] = useState({
    id: 0,
    voucherNo: "",
    transDate: new Date().toISOString(),
    transDateD: new Date(),
    nextDate: new Date().toISOString(),
    nextDateD: new Date(),
    fleetID: 0,
    accountID: 0,
    amount: 0,
    maintenanceDetails: [],
  });

  const { voucherNo, transDateD, nextDateD, fleetID, accountID, amount, maintenanceDetails } = formData;
  const [fleetList, setFleet] = useState([]);
  const [accountList, setAccount] = useState([]);
  const [costCenterList, setCostCenter] = useState(null);

  useEffect(() => {
    loadFleet({ filterSearch: null });
    loadAccount();
    loadCostCenter();
    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadData, loadFleet, loadAccount, loadCostCenter]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          voucherNo: data.data.voucherNo,
          transDate: data.data.transDate,
          transDateD: data.data.transDate === undefined ? null : new Date(data.data.transDate),
          nextDate: data.data.nextDate,
          nextDateD: data.data.nextDate === undefined ? null : new Date(data.data.nextDate),
          fleetID: data.data.fleetID,
          accountID: data.data.accountID,
          amount: data.data.amount,
          maintenanceDetails: data.data.maintenanceDetails,
        });
      }
    }
  }, [id, data, setFormData]);

  useEffect(() => {
    if (master.fleet !== undefined && master.fleet !== null) {
      let list = [...master.fleet];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          policeNo: "No Fleet",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setFleet(list);
    }

    if (master.account !== undefined && master.account !== null) {
      let list = [...master.account];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          name: "No Account",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setAccount(list);
    }

    if (master.costCenter !== undefined && master.costCenter !== null) {
      let list = [...master.costCenter];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          description: "No Cost Center",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setCostCenter(list);
    }
  }, [master]);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSelectChange = (e, name) => {
    setFormData({ ...formData, [name]: e.id });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (id === undefined) {
      addData({ url, body: formData }).then(() => {
        navigate(`${path}`);
      });
    } else {
      editData({ url, body: formData }).then(() => {
        navigate(`${path}`);
      });
    }
  };

  const handleNewRow = (e) => {
    e.preventDefault();

    let list = maintenanceDetails;
    if (list === undefined || list === null) list = [];

    list.push({
      checked: false,
      costCenter: 0,
      description: "",
      amount: 0,
    });
    setFormData({ ...formData, maintenanceDetails: list });
  };

  const onMaintenanceDetailCheck = (e, index) => {
    let list = maintenanceDetails;
    if (list === undefined || list === null) list = [];

    let checked = list[index]["checked"];
    list[index]["checked"] = checked ? false : true;

    setFormData({ ...formData, maintenanceDetails: list });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    let list = maintenanceDetails;
    if (list === undefined || list === null) list = [];

    let newDetail = [];

    list.map((item) => {
      if (!item.checked) newDetail.push(item);
      return null;
    });
  };

  const changeValue = (obj) => {
    if (typeof obj === "string") {
      let result = obj.replace(",", "");
      result = result.replace(",", "");
      result = result.replace(",", "");
      result = result.replace(",", "");
      result = result.replace(",", "");
      result = result.replace(",", "");
      return parseFloat(result);
    }
    if (typeof obj === "number") return obj;
    return 0;
  };

  const onDetailChange = (e, index) => {
    e.preventDefault();

    let curAmount = 0;
    let list = maintenanceDetails;
    if (list === undefined || list === null) list = [];

    list[index][e.target.name] = e.target.value;
    list.map((item) => {
      curAmount += changeValue(item.amount);
      return null;
    });
    setFormData({ ...formData, amount: curAmount, maintenanceDetails: list });
  };

  const onDetailSelectChange = (e, name, index) => {
    let details = maintenanceDetails;
    if (details === undefined || details === null) details = [];

    details[index][name] = e.id;
    console.log(details);

    setFormData({ ...formData, maintenanceDetails: details });
  };

  const renderMaintenanceDetail = () => {
    if (maintenanceDetails === undefined || maintenanceDetails === null) return null;

    return maintenanceDetails.map((item, index) => {
      return (
        <tr key={index}>
          <td className="text-center">
            <input type="checkbox" checked={item.checked !== undefined && item.checked} onChange={(e) => onMaintenanceDetailCheck(e, index)} />
          </td>
          <td className="text-center">{index + 1}</td>
          <td className="text-left">
            <Select2 options={costCenterList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"Pick Cost Center"} value={costCenterList === null ? null : costCenterList.filter((option) => option.id === parseInt(item.costCenterID))} handleChange={(e) => onDetailSelectChange(e, "costCenterID", index)} />
          </td>
          <td className="text-left">
            <input className="form-control" type="text" name="description" value={item.description} onChange={(e) => onDetailChange(e, index)} placeholder="Enter Description" />
          </td>
          <td className="text-right">
            <NumericFormat className="form-control text-right" name="amount" value={item.amount} onChange={(e) => onDetailChange(e, index)} allowNegative={false} thousandSeparator="," decimalScale={0} />
          </td>
        </tr>
      );
    });
  };

  const element = () => {
    return (
      <div className="row">
        <div className="form-group col-sm-12 mb-2">
          <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
            <div className="subTitle">Maintenance Information</div>
            <div className="row">
              <div className="form-group col-sm-4 col-6">
                <label>Voucher No</label>
                <input className="form-control" type="text" name="voucherNo" value={voucherNo} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly={true} />
              </div>
              <div className="form-group col-sm-4 col-6">
                <label>Maintenance Date</label>
                <DatePicker name="transDate" selected={transDateD} className="form-control" onChange={(date) => setFormData({ ...formData, transDate: moment(date).format("YYYY-MM-DD"), transDateD: date })} dateFormat="yyyy-MM-dd" />
              </div>
              <div className="form-group col-sm-4 col-6">
                <label>Next Date</label>
                <DatePicker name="nextDate" selected={nextDateD} className="form-control" onChange={(date) => setFormData({ ...formData, nextDate: moment(date).format("YYYY-MM-DD"), nextDateD: date })} dateFormat="yyyy-MM-dd" />
              </div>
              <div className="form-group col-sm-4 col-6">
                <label>Fleet</label>
                <Select2 options={fleetList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.policeNo} placeholder={"Pick Fleet"} value={fleetList === null ? null : fleetList.filter((option) => option.id === parseInt(fleetID))} handleChange={(e) => onSelectChange(e, "fleetID")} />
              </div>
              <div className="form-group col-sm-4 col-6">
                <label>Account</label>
                <Select2 options={accountList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Account"} value={accountList === null ? null : accountList.filter((option) => option.id === parseInt(accountID))} handleChange={(e) => onSelectChange(e, "accountID")} />
              </div>
              <div className="form-group col-sm-4 col-6">
                <label>Amount</label>
                <NumericFormat className="form-control text-right" name="amount" value={amount} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required readOnly={true} />
              </div>
            </div>
          </div>
        </div>

        <div className="form-group col-sm-12 mb-2">
          <div className="detail" style={{ height: "auto", marginBottom: "10px" }}>
            <div className="subTitle">Maintenance Detail</div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary mr-2" onClick={(e) => handleNewRow(e)}>
                <FaPlus className="mr-2" /> <span>Add</span>
              </button>
              <button className="btn btn-delete" onClick={(e) => handleDelete(e)}>
                <FaTimes className="mr-2" /> <span>Delete</span>
              </button>
            </div>

            <div className="item-table">
              <Table className="table-list mt-2" striped responsive hover style={{ paddingBottom: "120px" }}>
                <thead>
                  <tr>
                    <th style={{ minWidth: 40 }} className="header text-center"></th>
                    <th style={{ minWidth: 40 }} className="header text-center">
                      No
                    </th>
                    <th style={{ minWidth: 120 }} className="header">
                      Cost Center
                    </th>
                    <th style={{ minWidth: 120 }} className="header">
                      Description
                    </th>
                    <th style={{ minWidth: 50 }} className="header text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>{renderMaintenanceDetail()}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <FormWrapper img={img} title={title} path={path} type={type} role={role} id={id} handleSave={handleSave}>
      {element}
    </FormWrapper>
  );
};

MaintenanceForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  master: PropTypes.object,
  addData: PropTypes.func,
  editData: PropTypes.func,
  loadCostCenter: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadAccount, loadFleet, loadCostCenter })(MaintenanceForm);
