import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaTruck } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";

import { loadDriver, loadFleetCategory, loadFleetType } from "../../../actions/ice";
import Select2 from "../../../components/Select2";
import { setAlert } from "../../../actions/alert";

import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const FleetForm = ({ user, data, loadData, addData, editData, master, loadFleetCategory, loadFleetType, loadDriver, setAlert }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "Fleet";
  const img = <FaTruck className="module-img" />;
  const path = "/fleet-management/fleet";
  const url = "fleet";
  const role = "Fleet Management - Fleet";

  const [formData, setFormData] = useState({
    id: 0,
    policeNo: "",
    chasisNo: "",
    engineNo: "",
    fleetCategoryID: 0,
    fleetTypeID: 0,
    driverID: 0,
    fleetYear: "",
    fleetBrand: "",
    stnkDate: null,
    stnkDateD: null,
    kirDate: null,
    kirDateD: null,
    siuDate: null,
    siuDateD: null,
    insuranceNo: "",
    insuranceName: "",
    insuranceDate: null,
    insuranceDateD: null,
    gpsID: 0,
    gpsNo: "",
  });

  const { policeNo, chasisNo, engineNo, fleetCategoryID, fleetTypeID, driverID, fleetYear, fleetBrand, stnkDateD, kirDateD, siuDateD, insuranceNo, insuranceName, insuranceDateD, gpsID, gpsNo } = formData;
  const [fleetCategoryList, setFleetCategory] = useState(null);
  const [fleetTypeList, setFleetType] = useState(null);
  const [driverList, setDriver] = useState(null);

  const gpsList = [
    { id: 0, name: "No GPS" },
    { id: 1, name: "Solo Fleet" },
  ];

  useEffect(() => {
    loadFleetCategory();
    loadDriver();
    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadData, loadFleetCategory, loadDriver]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        console.log(data.data);
        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          policeNo: data.data.policeNo,
          chasisNo: data.data.chasisNo,
          engineNo: data.data.engineNo,
          fleetCategoryID: data.data.fleetCategoryID,
          fleetTypeID: data.data.fleetTypeID,
          driverID: data.data.driverID,
          fleetYear: data.data.fleetYear,
          fleetBrand: data.data.fleetBrand,
          stnkDate: data.data.stnkDate,
          stnkDateD: data.data.stnkDate === null ? null : new Date(data.data.stnkDate),
          kirDate: data.data.kirDate,
          kirDateD: data.data.kirDate === null ? null : new Date(data.data.kirDate),
          siuDate: data.data.siuDate,
          siuDateD: data.data.siuDate === null ? null : new Date(data.data.siuDate),
          insuranceNo: data.data.insuranceNo,
          insuranceName: data.data.insuranceName,
          insuranceDate: data.data.insuranceDate,
          insuranceDateD: data.data.insuranceDate === null ? null : new Date(data.data.insuranceDate),
          gpsID: data.data.gpsid,
          gpsNo: data.data.gpsNo,
        });

        loadFleetType({ filterSearch: { fleetCategoryID2: data.data.fleetCategoryID } });
      }
    }
  }, [id, data, setFormData]);

  useEffect(() => {
    if (master.fleetCategory !== undefined && master.fleetCategory !== null) {
      let list = [...master.fleetCategory];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          description: "No Fleet Category",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setFleetCategory(list);
    }

    if (master.fleetType !== undefined && master.fleetType !== null) {
      let list = [...master.fleetType];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          description: "No Fleet Type",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setFleetType(list);
    }

    if (master.driver !== undefined && master.driver !== null) {
      let list = [...master.driver];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          name: "No Driver",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setDriver(list);
    }
  }, [master]);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSelectChange = (e, name) => {
    if (name === "fleetCategoryID") {
      loadFleetType({ filterSearch: { fleetCategoryID2: e.id } });
    }
    setFormData({ ...formData, [name]: e.id });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (fleetCategoryID === 0) {
      setAlert("Invalid Fleet Category", "danger");
      return;
    }

    if (fleetTypeID === 0) {
      setAlert("Invalid Fleet Type", "danger");
      return;
    }

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
          <div className="form-group col-sm-4">
            <label>Police No</label>
            <span className="required-star">*</span>
            <input className="form-control" type="text" name="policeNo" value={policeNo} onChange={(e) => onChange(e)} placeholder="Enter Police No" required />
          </div>
          <div className="form-group col-sm-4">
            <label>Chasis No</label>
            <input className="form-control" type="text" name="chasisNo" value={chasisNo} onChange={(e) => onChange(e)} placeholder="Enter Chasis No" />
          </div>
          <div className="form-group col-sm-4">
            <label>Engine No</label>
            <input className="form-control" type="text" name="engineNo" value={engineNo} onChange={(e) => onChange(e)} placeholder="Enter Engine No" />
          </div>
          <div className="form-group col-sm-4">
            <label>Fleet Category</label>
            <Select2 options={fleetCategoryList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"Pick Fleet Category"} value={fleetCategoryList === null ? null : fleetCategoryList.filter((option) => option.id === parseInt(fleetCategoryID))} handleChange={(e) => onSelectChange(e, "fleetCategoryID")} />
          </div>
          <div className="form-group col-sm-4">
            <label>Fleet Type</label>
            <Select2 options={fleetTypeList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"Pick Fleet Type"} value={fleetTypeList === null ? null : fleetTypeList.filter((option) => option.id === parseInt(fleetTypeID))} handleChange={(e) => onSelectChange(e, "fleetTypeID")} />
          </div>
          <div className="form-group col-sm-4">
            <label>Driver</label>
            <Select2 options={driverList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Driver"} value={driverList === null ? null : driverList.filter((option) => option.id === parseInt(driverID))} handleChange={(e) => onSelectChange(e, "driverID")} />
          </div>
          <div className="form-group col-sm-4">
            <label>Fleet Year</label>
            <input className="form-control" type="text" name="fleetYear" value={fleetYear} onChange={(e) => onChange(e)} placeholder="Enter Fleet Year" />
          </div>
          <div className="form-group col-sm-4">
            <label>Fleet Brand</label>
            <input className="form-control" type="text" name="fleetBrand" value={fleetBrand} onChange={(e) => onChange(e)} placeholder="Enter Fleet Brand" />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="form-group col-sm-4">
            <label>STNK</label>
            <DatePicker name="stnkDateD" selected={stnkDateD} className="form-control" onChange={(date) => setFormData({ ...formData, stnkDate: date === null ? "" : moment(date).format("YYYY-MM-DDTHH:mm:ss"), stnkDateD: date })} dateFormat="yyyy-MM-dd" placeholderText="Enter STNK Due Date" />
          </div>
          <div className="form-group col-sm-4">
            <label>KIR</label>
            <DatePicker name="kirDateD" selected={kirDateD} className="form-control" onChange={(date) => setFormData({ ...formData, kirDate: date === null ? "" : moment(date).format("YYYY-MM-DDTHH:mm:ss"), kirDateD: date })} dateFormat="yyyy-MM-dd" placeholderText="Enter STNK Due Date" />
          </div>
          <div className="form-group col-sm-4">
            <label>SIU</label>
            <DatePicker name="siuDateD" selected={siuDateD} className="form-control" onChange={(date) => setFormData({ ...formData, siuDate: date === null ? "" : moment(date).format("YYYY-MM-DDTHH:mm:ss"), siuDateD: date })} dateFormat="yyyy-MM-dd" placeholderText="Enter STNK Due Date" />
          </div>
          <div className="form-group col-sm-4">
            <label>Insurance No</label>
            <input className="form-control" type="text" name="insuranceNo" value={insuranceNo} onChange={(e) => onChange(e)} placeholder="Enter Insurance No" />
          </div>
          <div className="form-group col-sm-4">
            <label>Insurance Name</label>
            <input className="form-control" type="text" name="insuranceName" value={insuranceName} onChange={(e) => onChange(e)} placeholder="Enter Insurance Name" />
          </div>
          <div className="form-group col-sm-4">
            <label>Insurance Date</label>
            <DatePicker name="insuranceDateD" selected={insuranceDateD} className="form-control" onChange={(date) => setFormData({ ...formData, insuranceDate: date === null ? "" : moment(date).format("YYYY-MM-DDTHH:mm:ss"), insuranceDateD: date })} dateFormat="yyyy-MM-dd" placeholderText="Enter Insurance Due Date" />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="form-group col-sm-4">
            <label>GPS Vendor</label>
            <Select2 options={gpsList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick GPS Vendor"} value={gpsList === null ? null : gpsList.filter((option) => option.id === parseInt(gpsID))} handleChange={(e) => onSelectChange(e, "gpsID")} />
          </div>
          <div className="form-group col-sm-4">
            <label>GPS No</label>
            <input className="form-control" type="text" name="gpsNo" value={gpsNo} onChange={(e) => onChange(e)} placeholder="Enter GPS No" />
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

FleetForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  addData: PropTypes.func,
  editData: PropTypes.func,

  master: PropTypes.object,
  loadFleetCategory: PropTypes.func,
  loadFleetType: PropTypes.func,
  loadDriver: PropTypes.func,
  setAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadFleetCategory, loadFleetType, loadDriver, setAlert })(FleetForm);
