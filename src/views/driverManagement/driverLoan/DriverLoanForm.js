import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { FaHandshake } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";

import { loadDriver, loadLoanType } from "../../../actions/ice";
import Select2 from "../../../components/Select2";
import { setAlert } from "../../../actions/alert";
import { NumericFormat } from "react-number-format";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const DriverLoanForm = ({ user, data, loadData, addData, editData, master, loadDriver, loadLoanType, setAlert }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "Driver Loan";
  const img = <FaHandshake className="module-img" />;
  const path = "/driver-management/driver-loan";
  const url = "driverLoan";
  const role = "Driver Management - Driver Loan";

  const [searchParams] = useSearchParams();
  const [returnUrl, setReturnUrl] = useState(path);
  useEffect(() => {
    if (searchParams.get("return_url") !== undefined && searchParams.get("return_url") !== null) setReturnUrl(searchParams.get("return_url"));
  }, [searchParams]);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: 0,
    voucherNo: "",
    date: new Date().toISOString(),
    dateD: new Date(),
    loanTypeID: 0,
    driverID: 0,
    amount: 0,
    accountNumber: "",
    accountBank: "",
    accountName: "",
    notes: "",
  });

  const { voucherNo, dateD, loanTypeID, driverID, amount, accountNumber, accountBank, accountName, notes } = formData;
  const [driverList, setDriver] = useState(null);
  const [loanTypeList, setLoanType] = useState(null);

  useEffect(() => {
    loadDriver();
    loadLoanType();
    if (user !== null && id !== undefined) loadData({ url, id });
    else setLoading(false);
  }, [id, user, loadData, loadDriver, loadLoanType]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          voucherNo: data.data.voucherNo,
          date: data.data.date,
          dateD: data.data.date === undefined ? null : new Date(data.data.date),
          loanTypeID: data.data.loanTypeID,
          driverID: data.data.driverID,
          amount: data.data.amount,
          accountNumber: data.data.accountNumber,
          accountBank: data.data.accountBank,
          accountName: data.data.accountName,
          notes: data.data.notes,
        });
        setLoading(false);
      }
    }
  }, [id, data, setFormData]);

  useEffect(() => {
    if (master.driver !== undefined && master.driver !== null) {
      let list = [...master.driver];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          name: "No Driver",
          mobileNo1: "",
          mobileNo2: "",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setDriver(list);
    }

    if (master.loanType !== undefined && master.loanType !== null) {
      let list = [...master.loanType];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          name: "No Loan Type",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setLoanType(list);
    }
  }, [master]);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSelectChange = (e, name) => {
    if (name === "driverID") {
      const driver = driverList.find((obj) => {
        return obj.id === e.id;
      });
      if (driver === undefined && driver === null) {
        setFormData({ ...formData, accountNumber: "", accountBank: "", accountName: "", [name]: e.id });
      } else {
        setFormData({ ...formData, accountNumber: driver.accountNo, accountBank: driver.mobileNo1, accountName: driver.accountName, [name]: e.id });
      }
    } else {
      setFormData({ ...formData, [name]: e.id });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (loanTypeID === 0) {
      setAlert("Invalid Loan Type", "danger");
      return;
    }

    if (driverID === 0) {
      setAlert("Invalid Driver", "danger");
      return;
    }

    if (id === undefined) {
      addData({ url, body: formData }).then(() => {
        if (searchParams.get("return_url") !== undefined && searchParams.get("return_url") !== null) navigate(`${searchParams.get("return_url")}`);
        else navigate(`${returnUrl}`);
      });
    } else {
      editData({ url, body: formData }).then(() => {
        if (searchParams.get("return_url") !== undefined && searchParams.get("return_url") !== null) navigate(`${searchParams.get("return_url")}`);
        else navigate(`${returnUrl}`);
      });
    }
  };

  const element = () => {
    if (loading) return null;
    return (
      <Fragment>
        <div className="row">
          <div className="form-group col-sm-6 mb-2">
            <div className="detail">
              <div className="subTitle">Detail Information</div>
              <div className="row">
                <div className="form-group col-sm-12">
                  <label>Voucher No</label>
                  <input className="form-control" type="text" name="voucherNo" value={voucherNo} onChange={(e) => onChange(e)} placeholder="Automatic By System" readOnly={true} />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <label>Date</label>
                  <DatePicker name="DateD" selected={dateD} className="form-control" onChange={(date) => setFormData({ ...formData, date: moment(date).format("YYYY-MM-DD"), dateD: date })} dateFormat="yyyy-MM-dd" />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-12">
                  <label>Loan Type</label>
                  <Select2 options={loanTypeList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Loan Type"} value={loanTypeList === null ? null : loanTypeList.filter((option) => option.id === parseInt(loanTypeID))} handleChange={(e) => onSelectChange(e, "loanTypeID")} />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-12">
                  <label>Amount</label>
                  <NumericFormat className="form-control text-right" name="amount" value={amount} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-12">
                  <label>Notes</label>
                  <input className="form-control" type="textarea" name="notes" value={notes} onChange={(e) => onChange(e)} placeholder="Enter Notes" />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group col-sm-6 mb-2">
            <div className="detail">
              <div className="subTitle">Driver Information</div>
              <div className="row">
                <div className="form-group col-12">
                  <label>Driver Name</label>
                  <Select2 options={driverList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Driver"} value={driverList === null ? null : driverList.filter((option) => option.id === parseInt(driverID))} handleChange={(e) => onSelectChange(e, "driverID")} />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-12">
                  <label>Account Number</label>
                  <input className="form-control" type="text" name="acountNumber" value={accountNumber} onChange={(e) => onChange(e)} placeholder="Enter Account Number" readOnly={true} />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-12">
                  <label>Account Bank</label>
                  <input className="form-control" type="text" name="acountBank" value={accountBank} onChange={(e) => onChange(e)} placeholder="Enter Account Bank" readOnly={true} />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-12">
                  <label>Account Name</label>
                  <input className="form-control" type="text" name="accountName" value={accountName} onChange={(e) => onChange(e)} placeholder="Enter Account Name" readOnly={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <FormWrapper img={img} title={title} path={path} type={type} role={role} id={id} handleSave={handleSave}>
      {element}
    </FormWrapper>
  );
};

DriverLoanForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  addData: PropTypes.func,
  editData: PropTypes.func,

  master: PropTypes.object,
  loadCustomer: PropTypes.func,
  loadAddress: PropTypes.func,
  loadFleetType: PropTypes.func,
  setAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadDriver, loadLoanType, setAlert })(DriverLoanForm);
