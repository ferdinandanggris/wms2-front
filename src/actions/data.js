import axios from "axios";
import qs from "qs";
import moment from "moment/moment";
import { setAlert } from "./alert";
import { ADD_DATA, DELETE_DATA, EDIT_DATA, LOAD_DATA, REFRESH_DATA, UPLOAD_DATA } from "./types";

// Refresh Data
export const refreshData = ({ url, page = 0, limit = 10, search = "", sort = "", filterSearch = {}, rangeDate = {} }) => async (dispatch) => {
  try {
    var filter = qs.stringify(filterSearch);
    filter = filter.replaceAll("&", "|");
    filter = filter.replaceAll("=", ":");

    var date = "";
    if (rangeDate[0] !== undefined) {
      var range = { startDate: moment(rangeDate[0].startDate).format("YYYY-MM-DD"), endDate: moment(rangeDate[0].endDate).format("YYYY-MM-DD") };
      date = qs.stringify(range);
      date = date.replaceAll("&", "|");
      date = date.replaceAll("=", ":");
    }
    // console.log(axios.defaults.baseURL);
    // console.log(`/${url}?page=${page}&limit=${limit}&search=${search}&sort=${sort}&filter=${filter}&date=${date}`);
    const res = await axios.get(`/${url}?page=${page}&limit=${limit}&search=${search}&sort=${sort}&filter=${filter}&date=${date}`);
    dispatch({
      type: REFRESH_DATA,
      payload: res.data,
      module: url,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

export const exportData = ({ url, search = "", sort = "", filterSearch = {} }) => async (dispatch) => {
  try {
    var filter = qs.stringify(filterSearch);
    filter = filter.replaceAll("&", "|");
    filter = filter.replaceAll("=", ":");
    const res = await axios.get(`/${url}?page=0&limit=0&search=${search}&sort=${sort}&filter=${filter}`);
    return Promise.resolve(res.data.data);
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
    return Promise.reject(errMessage);
  }
};

// Load Data
export const loadData = ({ url, id }) => async (dispatch) => {
  try {
    const res = await axios.get(`/${url}/${id}`);
    dispatch({
      type: LOAD_DATA,
      payload: res.data,
      module: url,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Add Data
export const addData = ({ url, body }) => async (dispatch) => {
  try {
    // console.log(body);
    const res = await axios.post(`/${url}`, body);
    dispatch({
      type: ADD_DATA,
      payload: res.data,
      module: url,
    });
    dispatch(setAlert("Data Added", "success"));
    return Promise.resolve();
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
    return Promise.reject(errMessage);
  }
};

// Edit Data
export const editData = ({ url, body }) => async (dispatch) => {
  try {
    const res = await axios.put(`/${url}`, body);
    dispatch({
      type: EDIT_DATA,
      payload: res.data,
      module: url,
    });
    dispatch(setAlert("Data Edited", "success"));
    return Promise.resolve();
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
    return Promise.reject(errMessage);
  }
};

// Delete Data
export const deleteData = ({ url, id }) => async (dispatch) => {
  try {
    const res = await axios.delete(`/${url}/${id}`);
    dispatch({
      type: DELETE_DATA,
      payload: res.data,
      module: url,
    });
    dispatch(setAlert("Data Deleted", "success"));
    return Promise.resolve();
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
    return Promise.reject(errMessage);
  }
};

// Upload File
export const uploadFile = ({ url, body }) => async (dispatch) => {
  try {
    dispatch(setAlert("Uploading", "warning"));

    const res = await axios.post(`/${url}/upload-file`, body);
    dispatch({
      type: UPLOAD_DATA,
      payload: res.data,
    });
    dispatch(refreshData({ url }));
    dispatch(setAlert("Data Uploaded", "success"));
    return Promise.resolve();
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
    return Promise.reject(errMessage);
  }
};
