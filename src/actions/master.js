import axios from "axios";
import { setAlert } from "./alert";
import { LOAD_USER, LOAD_ROLE, LOAD_MODULE, LOAD_CUSTOMER, LOAD_WAREHOUSE,LOAD_ITEM, LOAD_CATEGORY, LOAD_PACKING } from "./types";

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

// Load Customer
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
//Load Item
export const loadItem= () => async (dispatch) => {
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

export const loadCategory= () => async (dispatch) => {
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
export const loadPacking= () => async (dispatch) => {
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