import axios from "axios";
import { setAlert } from "./alert";
import { DASHBOARD_ACHIEVEMENT, DASHBOARD_DOCUMENTSTATUS, DASHBOARD_FLEETORDER, DASHBOARD_FLEETSTATUS } from "./types";

// Get Dashboard Achievement
export const getDashboardAchievement = ({ startDate, endDate }) => async (dispatch) => {
  try {
    const res = await axios.get(`/dashboard/achievement?startDate=${startDate}&endDate=${endDate}`);
    dispatch({
      type: DASHBOARD_ACHIEVEMENT,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Get Dashboard Fleet Order
export const getDashboardFleetOrder = ({ fleetTypeID }) => async (dispatch) => {
  try {
    const res = await axios.get(`/dashboard/fleet-order?fleetTypeID=${fleetTypeID}`);
    dispatch({
      type: DASHBOARD_FLEETORDER,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Get Dashboard Fleet Status
export const getDashboardFleetStatus = () => async (dispatch) => {
  try {
    const res = await axios.get(`/dashboard/fleet-status`);
    dispatch({
      type: DASHBOARD_FLEETSTATUS,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Get Dashboard Document Status
export const getDashboardDocumentStatus = () => async (dispatch) => {
  try {
    const res = await axios.get(`/dashboard/document-status`);
    dispatch({
      type: DASHBOARD_DOCUMENTSTATUS,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};
