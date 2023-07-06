import { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { FaMap } from "react-icons/fa";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadData, addData, editData } from "../../../actions/data";
import FormWrapper from "../../../components/Wrapper/FormWrapper";

import { loadCustomer, loadSector } from "../../../actions/ice";
import Select2 from "../../../components/Select2";
import { setAlert } from "../../../actions/alert";

import { Wrapper } from "@googlemaps/react-wrapper";
import { googleAPI } from "../../../utility/config";

const AddressForm = ({ user, data, loadData, addData, editData, master, loadCustomer, loadSector, setAlert }) => {
  let { type, id } = useParams();

  const navigate = useNavigate();

  const title = "Address";
  const img = <FaMap className="module-img" />;
  const path = "/customer-management/address";
  const url = "address";
  const role = "Customer Management - Address";

  const [searchParams] = useSearchParams();
  const [returnUrl, setReturnUrl] = useState(path);
  useEffect(() => {
    if (searchParams.get("return_url") !== undefined && searchParams.get("return_url") !== null) setReturnUrl(searchParams.get("return_url"));
  }, []);

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    addressName: "",
    description: "",
    sectorID: 0,
    province: "",
    city: "",
    postalCode: "",
    contactPerson: "",
    phoneNo: "",
    customerID: 0,
    radius: 100,
    latitude: -6.168728,
    longitude: 106.8167176,
    isPool: false,
  });

  const { name, addressName, description, province, city, postalCode, contactPerson, phoneNo, customerID, sectorID, radius, latitude, longitude, isPool } = formData;
  const [customerList, setCustomer] = useState(null);
  const [sectorList, setSector] = useState(null);
  const mapProps = {
    apiKey: googleAPI,
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 16,
    radius: radius,
    libraries: ["places"],
  };

  useEffect(() => {
    loadCustomer();
    loadSector();
    if (user !== null && id !== undefined) loadData({ url, id });
  }, [id, user, loadData, loadCustomer]);

  useEffect(() => {
    if (data !== undefined && data !== null && id !== undefined) {
      if (data.module !== url) return;
      if (data.data !== undefined && data.data !== null) {
        setFormData({
          id: id === undefined ? 0 : parseInt(id),
          name: data.data.name,
          addressName: data.data.addressName,
          description: data.data.description,
          province: data.data.province,
          city: data.data.city,
          postalCode: data.data.postalCode,
          contactPerson: data.data.contactPerson,
          phoneNo: data.data.phoneNo,
          customerID: data.data.customerID,
          sectorID: data.data.sectorID,
          radius: data.data.radius,
          latitude: data.data.latitude,
          longitude: data.data.longitude,
          isPool: data.data.isPool,
        });
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
    if (master.sector !== undefined && master.sector !== null) {
      let list = [...master.sector];
      const obj = list.find((obj) => obj.id === 0);
      if (obj === undefined || obj === null) {
        list.push({
          name: "No Sector",
          id: 0,
        });
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      setSector(list);
    }
  }, [master]);

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.name === "radius" || e.target.name === "latitude" || e.target.name === "longitude") setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
    else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCheck = (e) => {
    setFormData({
      ...formData,
      customerID: isPool ? customerID : 0,
      isPool: isPool ? false : true,
    });
  };

  const onSelectChange = (e, name) => {
    setFormData({ ...formData, [name]: e.id });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!isPool && customerID === 0) {
      setAlert("Invalid Customer", "danger");
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

  const MapComponent = ({ center, zoom, radius }) => {
    const refMap = useRef();

    useEffect(() => {
      const map = new window.google.maps.Map(refMap.current, {
        center,
        zoom,
        mapTypeControl: false,
        controlSize: 20,
      });

      new window.google.maps.Marker({
        position: center,
        map: map,
      });

      new window.google.maps.Circle({
        strokeColor: "#328CB4",
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: "#328CB4",
        fillOpacity: 0.3,
        map,
        center,
        radius,
      });

      const options = {
        fields: ["formatted_address", "geometry", "address_components", "name"],
        strictBounds: false,
        componentRestrictions: { country: "id" },
      };

      const input = document.getElementById("autocomplete_search");
      const autocomplete = new window.google.maps.places.Autocomplete(input, options);

      autocomplete.addListener("place_changed", function () {
        var place = autocomplete.getPlace();
        if (place.length === 0) return;

        let province = "";
        let city = "";
        let postalCode = "";
        let description = place.name + ", " + place.formatted_address;
        for (var i = 0; i < place.address_components.length; i++) {
          for (var j = 0; j < place.address_components[i].types.length; j++) {
            if (place.address_components[i].types[j] === "administrative_area_level_1") province = place.address_components[i].long_name;
            if (place.address_components[i].types[j] === "administrative_area_level_2") city = place.address_components[i].long_name;
            if (place.address_components[i].types[j] === "postal_code") postalCode = place.address_components[i].long_name;
          }
        }

        setFormData({
          ...formData,
          description: description,
          province: province,
          city: city,
          postalCode: postalCode,
          addressName: place.formatted_address,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        });
      });
    });

    return <div ref={refMap} id="map" className="map" />;
  };

  const renderMap = () => {
    return (
      <Wrapper apiKey={mapProps.apiKey} libraries={mapProps.libraries}>
        <MapComponent center={mapProps.center} zoom={mapProps.zoom} radius={mapProps.radius} />
      </Wrapper>
    );
  };

  const element = () => {
    return (
      <Fragment>
        <div className="row">
          <div className="form-group col-sm-6 mb-2">
            <div className="detail">
              <div className="subTitle">Detail Information</div>
              <div className="row">
                <div className="form-group col-sm-6">
                  <div className="d-flex flex-row">
                    <label className="switch">
                      <input type="checkbox" name="isPool" checked={isPool} onChange={(e) => onCheck(e)} />
                      <span className="slider round"></span>
                    </label>
                    <div className="remember-me">Pool</div>
                  </div>
                </div>
              </div>
              {!isPool && (
                <div className="row ">
                  <div className="form-group col-sm-6">
                    <label>Customer</label>
                    <Select2 options={customerList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Customer"} value={customerList === null ? null : customerList.filter((option) => option.id === parseInt(customerID))} handleChange={(e) => onSelectChange(e, "customerID")} />
                  </div>
                </div>
              )}
              <div className="row">
                <div className="form-group col-sm-12">
                  <label>Name</label>
                  <span className="required-star">*</span>
                  <input className="form-control" type="text" name="name" value={name} onChange={(e) => onChange(e)} required placeholder="Enter Name" />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-sm-12">
                  <label>Description</label>
                  <span className="required-star">*</span>
                  <textarea className="form-control notes" name="description" value={description} onChange={(e) => onChange(e)} placeholder="Enter Description" />
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="form-group col-sm-12">
                  <label>Address</label>
                  <div className="d-flex">
                    <input id="autocomplete_search" className="form-control mr-2" type="text" name="addressName" value={addressName} onChange={(e) => onChange(e)} placeholder="Enter Address" />
                  </div>
                </div>
                <div className="form-group col-sm-12">
                  <label>Sector</label>
                  <Select2 options={sectorList} optionValue={(option) => option.id.toString()} optionLabel={(option) => option.name} placeholder={"Pick Sector"} value={sectorList === null ? null : sectorList.filter((option) => option.id === parseInt(sectorID))} handleChange={(e) => onSelectChange(e, "sectorID")} />
                </div>
                <div className="form-group col-sm-6">
                  <label>Province</label>
                  <input className="form-control" type="text" name="province" value={province} onChange={(e) => onChange(e)} placeholder="Enter Province" />
                </div>
                <div className="form-group col-sm-6">
                  <label>City</label>
                  <input className="form-control" type="text" name="city" value={city} onChange={(e) => onChange(e)} placeholder="Enter City" />
                </div>
                <div className="form-group col-sm-6">
                  <label>Postal Code</label>
                  <input className="form-control" type="text" name="postalCode" value={postalCode} onChange={(e) => onChange(e)} placeholder="Enter Postal Code" />
                </div>
                <div className="form-group col-sm-6">
                  <label>Radius</label>
                  <input className="form-control number" type="number" name="radius" value={radius} onChange={(e) => onChange(e)} placeholder="Enter Postal Code" />
                </div>
                <div className="form-group col-sm-6">
                  <label>Longitude</label>
                  <span className="required-star">*</span>
                  <input className="form-control" type="text" name="longitude" value={longitude} onChange={(e) => onChange(e)} required placeholder="Enter Longitude" />
                </div>
                <div className="form-group col-sm-6">
                  <label>Latitude</label>
                  <span className="required-star">*</span>
                  <input className="form-control" type="text" name="latitude" value={latitude} onChange={(e) => onChange(e)} required placeholder="Enter Latitude" />
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="form-group col-sm-6">
                  <label>Contact Person</label>
                  <input className="form-control" type="text" name="contactPerson" value={contactPerson} onChange={(e) => onChange(e)} placeholder="Enter Contact Person" />
                </div>
                <div className="form-group col-sm-6">
                  <label>Phone No</label>
                  <input className="form-control" type="text" name="phoneNo" value={phoneNo} onChange={(e) => onChange(e)} placeholder="Enter Phone No" />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group col-sm-6 mb-2">
            <div className="detail">
              <div className="subTitle">Map Information</div>
              {renderMap()}
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

AddressForm.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  loadData: PropTypes.func,
  addData: PropTypes.func,
  editData: PropTypes.func,

  master: PropTypes.object,
  loadCustomer: PropTypes.func,
  loadSector: PropTypes.func,
  setAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.data,
  master: state.master,
});

export default connect(mapStateToProps, { loadData, addData, editData, loadCustomer, loadSector, setAlert })(AddressForm);
