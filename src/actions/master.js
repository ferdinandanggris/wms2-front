import axios from "axios";
import { setAlert } from "./alert";
import { LOAD_USER, LOAD_ROLE, LOAD_MODULE, LOAD_CUSTOMER, LOAD_WAREHOUSE, LOAD_ITEM, LOAD_CATEGORY, LOAD_PACKING, LOAD_GROUP, LOAD_BATCH, LOAD_BACTHDETAIL, LOAD_VENDOR } from "./types";

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

// Load Customer
export const loadCustomer = () => async (dispatch) => {
  try {
    const res = await axios.get(`/customer?sort=name`);
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
    const res = await axios.get(`/warehouse?sort=name`);
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
    const res = await axios.get(`/Item`);
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

//Load Batch
export const loadBatch = () => async (dispatch) => {
  try {
    const res = await axios.get(`/Batch`);
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

//Load Vendor
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
