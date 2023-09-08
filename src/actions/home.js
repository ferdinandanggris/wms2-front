import axios from "axios";
import {
  HOME_LIST_ITEM,
  HOME_SEARCH_ITEM,
  HOME_SPK_PENDING_LIST,
  HOME_SUMMARY,
  HOME_TOP_ITEM_TOTAL,
  HOME_WAREHOUSE_CAPACITY,
} from "./types";
import { setAlert } from "./alert";

export const getHomeSummaryData =
  ({ startDate = "", endDate = "" }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(
        `/Dashboard/SummaryData?startDate=${startDate}&endDate=${endDate}`
      );
      dispatch({
        type: HOME_SUMMARY,
        payload: res.data,
      });
    } catch (err) {
      let errMessage = "";
      if (err.message) errMessage = err.message;
      if (err.response && err.response.data && err.response.data.message)
        errMessage = err.response.data.message;
      dispatch(setAlert(errMessage, "danger"));
    }
  };

export const getHomeSearchItem =
  ({ itemId }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(`/Dashboard/Searchitem?itemId=${itemId}`);
      dispatch({
        type: HOME_SEARCH_ITEM,
        payload: res.data,
      });
    } catch (err) {
      let errMessage = "";
      if (err.message) errMessage = err.message;
      if (err.response && err.response.data && err.response.data.message)
        errMessage = err.response.data.message;
      dispatch(setAlert(errMessage, "danger"));
    }
  };

export const getHomeWarehouseCapacity = () => async (dispatch) => {
  try {
    const res = await axios.get(`/Dashboard/WarehouseCapacity`);
    dispatch({
      type: HOME_WAREHOUSE_CAPACITY,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message)
      errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

export const getHomeTopItemsTotal =
  ({ page = 0 }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(`/Dashboard/TopItemsTotal?page=${page}`);
      dispatch({
        type: HOME_TOP_ITEM_TOTAL,
        payload: res.data,
      });
    } catch (err) {
      let errMessage = "";
      if (err.message) errMessage = err.message;
      if (err.response && err.response.data && err.response.data.message)
        errMessage = err.response.data.message;
      dispatch(setAlert(errMessage, "danger"));
    }
  };

export const getHomeSpkPendingList =
  ({ page = 0 }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(`/Dashboard/SpkPendingList?page=${page}`);
      dispatch({
        type: HOME_SPK_PENDING_LIST,
        payload: res.data,
      });
    } catch (err) {
      let errMessage = "";
      if (err.message) errMessage = err.message;
      if (err.response && err.response.data && err.response.data.message)
        errMessage = err.response.data.message;
      dispatch(setAlert(errMessage, "danger"));
    }
  };

export const getHomeListItems =
  ({ search = "" }) =>
  async (dispatch) => {
    console.log('__LIST__');
    try {
      const res = await axios.get(`/Item?search=${search}&limit=0`);
      dispatch({
        type: HOME_LIST_ITEM,
        payload: res.data,
      });
    } catch (err) {
      let errMessage = "";
      if (err.message) errMessage = err.message;
      if (err.response && err.response.data && err.response.data.message)
        errMessage = err.response.data.message;
      dispatch(setAlert(errMessage, "danger"));
    }
  };
