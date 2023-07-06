import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaUserFriends } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";

import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const DriverForm = ({ user, data, loadData, addData, editData }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "Driver";
  const img = <FaUserFriends className="module-img" />;
  const path = "/driver-management/driver";
  const url = "driver";
  const role = "Driver Management - Driver";

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    mobileNo1: "",
    mobileNo2: "",
    bankName: "",
    accountNo: "",
    accountName: "",
    identityNo: "",
    driverLicense: "",
    expiredDate: null,
    startWorking: null,
    endWorking: null,
    expiredDateD: null,
  });

  const { name, mobileNo1, mobileNo2, bankName, accountNo, accountName, identityNo, driverLicense, expiredDateD } = formData;

  useEffect(() => {
    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadData]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          name: data.data.name,
          mobileNo1: data.data.mobileNo1,
          mobileNo2: data.data.mobileNo2,
          bankName: data.data.bankName,
          accountNo: data.data.accountNo,
          accountName: data.data.accountName,
          identityNo: data.data.identityNo,
          driverLicense: data.data.driverLicense,
          expiredDate: data.data.expiredDate,
          startWorking: data.data.startWorking,
          endWorking: data.data.endWorking,
          expiredDateD: data.data.expiredDate === null ? null : new Date(data.data.expiredDate),
          startWorkingD: data.data.startWorking === null ? null : new Date(data.data.startWorking),
          endWorkingD: data.data.endWorking === null ? null : new Date(data.data.endWorking),
        });
      }
    }
  }, [id, data, setFormData]);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const element = () => {
    return (
      <div className="detail mb-2">
        <div className="subTitle">Detail Information</div>
        <div className="row">
          <div className="form-group col-sm-12">
            <label>Name</label>
            <span className="required-star">*</span>
            <input className="form-control" type="text" name="name" value={name} onChange={(e) => onChange(e)} placeholder="Enter Name" required />
          </div>
          <div className="form-group col-sm-6">
            <label>Mobile No 1</label>
            <input className="form-control" type="text" name="mobileNo1" value={mobileNo1} onChange={(e) => onChange(e)} placeholder="Enter Mobile No 1" />
          </div>
          <div className="form-group col-sm-6">
            <label>Mobile No 2</label>
            <input className="form-control" type="text" name="mobileNo2" value={mobileNo2} onChange={(e) => onChange(e)} placeholder="Enter Mobile No 2" />
          </div>
          <div className="form-group col-sm-4">
            <label>Bank Name</label>
            <input className="form-control" type="text" name="bankName" value={bankName} onChange={(e) => onChange(e)} placeholder="Enter Bank Name" />
          </div>
          <div className="form-group col-sm-4">
            <label>Account No</label>
            <input className="form-control" type="text" name="accountNo" value={accountNo} onChange={(e) => onChange(e)} placeholder="Enter Account No" />
          </div>
          <div className="form-group col-sm-4">
            <label>Account Name</label>
            <input className="form-control" type="text" name="accountName" value={accountName} onChange={(e) => onChange(e)} placeholder="Enter Account Name" />
          </div>
          <div className="form-group col-sm-4">
            <label>Identity No</label>
            <input className="form-control" type="text" name="identityNo" value={identityNo} onChange={(e) => onChange(e)} placeholder="Enter Identity No" />
          </div>
          <div className="form-group col-sm-4">
            <label>Driver License</label>
            <input className="form-control" type="text" name="driverLicense" value={driverLicense} onChange={(e) => onChange(e)} placeholder="Enter Driver License" />
          </div>
          <div className="form-group col-sm-4">
            <label>Expired Date</label>
            <DatePicker name="expiredDate" selected={expiredDateD} className="form-control" onChange={(date) => setFormData({ ...formData, expiredDate: moment(date).format("YYYY-MM-DDTHH:mm:ss"), expiredDateD: date })} dateFormat="yyyy-MM-dd" placeholderText="Enter Expired Driver License" />
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

DriverForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  addData: PropTypes.func,
  editData: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
});

export default connect(mapStateToProps, { loadData, addData, editData })(DriverForm);
