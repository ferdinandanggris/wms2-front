import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { FaHandshake } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";

import { loadAddress, loadCustomer, loadFleetType } from "../../../actions/ice";
import Select2 from "../../../components/Select2";
import { setAlert } from "../../../actions/alert";
import { NumericFormat } from "react-number-format";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const ContractForm = ({ user, data, loadData, addData, editData, master, loadCustomer, loadAddress, loadFleetType, setAlert }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "Contract";
  const img = <FaHandshake className="module-img" />;
  const path = "/customer-management/contract";
  const url = "contract";
  const role = "Customer Management - Contract";

  const [searchParams] = useSearchParams();
  const [returnUrl, setReturnUrl] = useState(path);
  useEffect(() => {
    if (searchParams.get("return_url") !== undefined && searchParams.get("return_url") !== null) setReturnUrl(searchParams.get("return_url"));
  }, []);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: 0,
    customerID: 0,
    startDate: new Date().toISOString(),
    startDateD: new Date(),
    endDate: new Date().toISOString(),
    endDateD: new Date(),
    originID: 0,
    destinationID: 0,
    fleetTypeID: 0,
    point: 0,
    unitPrice: 0,
    additionalPrice: 0,
    volumeRatio: 1,
    volumePrice: 0,
    sizeRatio: 1,
    sizePrice: 0,
    weightPrice: 0,
    pcsPrice: 0,
  });

  const { customerID, startDateD, endDateD, originID, destinationID, fleetTypeID, point, unitPrice, additionalPrice, volumeRatio, volumePrice, sizeRatio, sizePrice, weightPrice, pcsPrice } = formData;
  const [customerList, setCustomer] = useState(null);
  const [fleetTypeList, setFleetType] = useState(null);
  const [addressList, setAddress] = useState(null);

  useEffect(() => {
    loadCustomer();
    loadFleetType({ filterSearch: "" });
    if (user !== null && id !== undefined) loadData({ url, id });
    else setLoading(false);
  }, [id, user, loadData, loadCustomer]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          customerID: data.data.customerID,
          startDate: data.data.startDate,
          startDateD: data.data.startDate === undefined ? null : new Date(data.data.startDate),
          endDate: data.data.endDate,
          endDateD: data.data.endDate === undefined ? null : new Date(data.data.endDate),
          originID: data.data.originID,
          destinationID: data.data.destinationID,
          fleetTypeID: data.data.fleetTypeID,
          point: data.data.point,
          unitPrice: data.data.unitPrice,
          additionalPrice: data.data.additionalPrice,
          volumeRatio: data.data.volumeRatio,
          volumePrice: data.data.volumePrice,
          sizeRatio: data.data.sizeRatio,
          sizePrice: data.data.sizePrice,
          weightPrice: data.data.weightPrice,
          pcsPrice: data.data.pcsPrice,
        });

        if (data.data.customer !== undefined && data.data.customer !== null) {
          if (data.data.customer.addresses !== undefined && data.data.customer.addresses !== null) {
            let list = [];
            data.data.customer.addresses.map((item) => {
              if (item.isDeleted === null) list.push({ name: item.name, id: item.id, lng: item.longitude, lat: item.latitude });
              return null;
            });
            setAddress(list);
          }
        }
        setLoading(false);
      }
    }
  }, [id, data, setFormData]);

  useEffect(() => {
    if (master.customer !== undefined && master.customer !== null) {
      let list = [...master.customer];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          name: "No Customer",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setCustomer(list);
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
  }, [master]);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSelectChange = (e, name) => {
    if (name === "customerID") {
      const customer = customerList.find((obj) => {
        return obj.id === e.id;
      });
      if (customer === undefined && customer === null) return;

      if (customer.addresses !== undefined && customer.addresses !== null) {
        let list = [];
        customer.addresses.map((item) => {
          if (item.isDeleted === null) list.push({ name: item.name, id: item.id, lng: item.longitude, lat: item.latitude });
          return null;
        });
        setAddress(list);
      }
    }
    setFormData({ ...formData, [name]: e.id });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (customerID === 0) {
      setAlert("Invalid Customer", "danger");
      return;
    }

    if (originID === 0) {
      setAlert("Invalid Origin", "danger");
      return;
    }

    if (destinationID === 0) {
      setAlert("Invalid Destination", "danger");
      return;
    }

    if (fleetTypeID === 0) {
      setAlert("Invalid Fleet Type", "danger");
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
                <div className="form-group col-sm-6">
                  <label>Customer</label>
                  <Select2 options={customerList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Customer"} value={customerList === null ? null : customerList.filter((option) => option.id === parseInt(customerID))} handleChange={(e) => onSelectChange(e, "customerID")} />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <label>Start Date</label>
                  <DatePicker name="startDateD" selected={startDateD} className="form-control" onChange={(date) => setFormData({ ...formData, startDate: moment(date).format("YYYY-MM-DD"), startDateD: date })} dateFormat="yyyy-MM-dd" />
                </div>
                <div className="form-group col-6">
                  <label>End Date</label>
                  <DatePicker name="endDateD" selected={endDateD} className="form-control" onChange={(date) => setFormData({ ...formData, endDate: moment(date).format("YYYY-MM-DD"), endDateD: date })} dateFormat="yyyy-MM-dd" />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-sm-6">
                  <label>Origin</label>
                  <Select2 options={addressList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Origin"} value={addressList === null ? null : addressList.filter((option) => option.id === parseInt(originID))} handleChange={(e) => onSelectChange(e, "originID")} />
                </div>
                <div className="form-group col-sm-6">
                  <label>Destination</label>
                  <Select2 options={addressList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Destination"} value={addressList === null ? null : addressList.filter((option) => option.id === parseInt(destinationID))} handleChange={(e) => onSelectChange(e, "destinationID")} />
                </div>
                <div className="form-group col-sm-6">
                  <label>Fleet Type</label>
                  <Select2 options={fleetTypeList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.description} placeholder={"Pick Fleet Type"} value={fleetTypeList === null ? null : fleetTypeList.filter((option) => option.id === parseInt(fleetTypeID))} handleChange={(e) => onSelectChange(e, "fleetTypeID")} />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group col-sm-6 mb-2">
            <div className="detail">
              <div className="subTitle">Price Information</div>
              <div className="row">
                <div className="form-group col-4">
                  <label>Unit Price</label>
                  <NumericFormat className="form-control text-right" name="unitPrice" value={unitPrice} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required />
                </div>
                <div className="form-group col-4">
                  <label>Point</label>
                  <NumericFormat className="form-control text-right" name="point" value={point} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required />
                </div>
                <div className="form-group col-4">
                  <label>Additional Price</label>
                  <NumericFormat className="form-control text-right" name="additionalPrice" value={additionalPrice} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required />
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="form-group col-6">
                  <label>Volume Price</label>
                  <NumericFormat className="form-control text-right" name="volumePrice" value={volumePrice} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required />
                </div>
                <div className="form-group col-6">
                  <label>Size Price</label>
                  <NumericFormat className="form-control text-right" name="sizePrice" value={sizePrice} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <label>Weight Price</label>
                  <NumericFormat className="form-control text-right" name="weightPrice" value={weightPrice} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required />
                </div>
                <div className="form-group col-6">
                  <label>Pcs Price</label>
                  <NumericFormat className="form-control text-right" name="pcsPrice" value={pcsPrice} onChange={(e) => onChange(e)} allowNegative={false} thousandSeparator="," decimalScale={0} required />
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

ContractForm.propTypes = {
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

export default connect(mapStateToProps, { loadData, addData, editData, loadCustomer, loadAddress, loadFleetType, setAlert })(ContractForm);
