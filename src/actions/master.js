import axios from "axios";
import { setAlert } from "./alert";
import { LOAD_USER, LOAD_ROLE, LOAD_MODULE, LOAD_UOM, LOAD_CUSTOMER, LOAD_WAREHOUSE, LOAD_ITEM, LOAD_CATEGORY, LOAD_PACKING, LOAD_GROUP, LOAD_VENDOR, LOAD_PALLET, LOAD_LOCATION, LOAD_BATCH, LOAD_SHIPPINGDETAIL, LOAD_SHIPPING, LOAD_ORDER, LOAD_ORDERDETAIL, LOAD_PRODUCTION, LOAD_DISTRICT, LOAD_COUNTRY, LOAD_PROVINCE, LOAD_TERMOFPAYMENT, LOAD_CITY, LOAD_SELLER } from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get(`/user?sort=fullname`);
    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

// Load Role
export const loadRole = () => async (dispatch) => {
  try {
    const res = await axios.get(`/role?sort=description`);
    dispatch({
      type: LOAD_ROLE,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

// Load Module
export const loadModule = () => async (dispatch) => {
  try {
    const res = await axios.get(`/module?sort=description`);
    dispatch({
      type: LOAD_MODULE,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

// Load Warehouse
export const loadWarehouse = () => async (dispatch) => {
  try {
    const res = await axios.get(`/warehouse`);
    dispatch({
      type: LOAD_WAREHOUSE,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load Group
export const loadGroup = () => async (dispatch) => {
  try {
    const res = await axios.get(`/group?sort=name`);
    dispatch({
      type: LOAD_GROUP,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load Item
export const loadItem = () => async (dispatch) => {
  try {
    const res = await axios.get(`/Item?sort=name`);
    dispatch({
      type: LOAD_ITEM,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load Category
export const loadCategory = () => async (dispatch) => {
  try {
    const res = await axios.get(`/Category`);
    dispatch({
      type: LOAD_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load Packing
export const loadPacking = () => async (dispatch) => {
  try {
    const res = await axios.get(`/Packing`);
    dispatch({
      type: LOAD_PACKING,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load Uom
export const loadUom = () => async (dispatch) => {
  try {
    const res = await axios.get(`/Uom`);
    dispatch({
      type: LOAD_UOM,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//LOAD_VENDOR
export const loadVendor = () => async (dispatch) => {
  try {
    const res = await axios.get(`/Vendor`);
    dispatch({
      type: LOAD_VENDOR,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load Customer
export const loadCustomer = () => async (dispatch) => {
  try {
    const res = await axios.get(`/Customer`);
    dispatch({
      type: LOAD_CUSTOMER,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load Pallet
export const loadPallet = () => async (dispatch) => {
  try {
    const res = await axios.get(`/Pallet?limit=0&page=0`);
    dispatch({
      type: LOAD_PALLET,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load Location
export const loadLocation = () => async (dispatch) => {
  try {
    const res = await axios.get(`/Location`);
    dispatch({
      type: LOAD_LOCATION,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load Batch
export const loadBatch = () => async (dispatch) => {
  try {
    const res = await axios.get(`/Batch?limit=0&page=0`);
    dispatch({
      type: LOAD_BATCH,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load Shipping
export const loadShipping = () => async (dispatch) => {
  try {
    const res = await axios.get(`/Shipping?limit=100&page=0`);
    dispatch({
      type: LOAD_SHIPPING,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load ShippingDetail
export const loadShippingDetail = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.get(`/Shipping/${id}`);
    dispatch({
      type: LOAD_SHIPPINGDETAIL,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load Production
export const loadproduction = () => async (dispatch) => {
  try {
    const res = await axios.get(`/Production`);
    dispatch({
      type: LOAD_PRODUCTION,
      payload: res.data,
    });

  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load OrderDetail
export const loadOrderDetail = ({ id }) => async (dispatch) => {
  try {
    const res = await axios.get(`/Order/${id}`);
    dispatch({
      type: LOAD_ORDERDETAIL,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load Order
export const loadOrder = () => async (dispatch) => {
  try {
    const res = await axios.get(`/Order?limit=10&page=0`);
    dispatch({
      type: LOAD_ORDER,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load Country
export const loadCountry = () => async (dispatch) => {
  try {
    const res = await axios.get(`/Country`);
    dispatch({
      type: LOAD_COUNTRY,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load District
export const loadDistrict = () => async (dispatch) => {
  try {
    const res = await axios.get(`/District?limit=10&page=0`);
    dispatch({
      type: LOAD_DISTRICT,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load Province
export const loadProvince = () => async (dispatch) => {
  try {
    const res = await axios.get(`/Province`);
    dispatch({
      type: LOAD_PROVINCE,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load Seller
export const loadSeller = () => async (dispatch) => {
  try {
    const res = await axios.get(`/Sale`);
    dispatch({
      type: LOAD_SELLER,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load City
export const loadCity = () => async (dispatch) => {
  try {
    const res = await axios.get(`/Regency`);
    dispatch({
      type: LOAD_CITY,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}

//Load Terom of Payment
export const loadTermOfPayment = () => async (dispatch) => {
  try {
    const res = await axios.get(`/TermOfPayment`);
    dispatch({
      type: LOAD_TERMOFPAYMENT,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, 'danger'));
  }
}
