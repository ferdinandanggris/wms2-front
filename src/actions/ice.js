import axios from "axios";
import qs from "qs";
import { setAlert } from "./alert";
import { LOAD_FLEETCATEGORY, LOAD_FLEETTYPE, LOAD_INDUSTRY, LOAD_CATEGORY, LOAD_CUSTOMER, LOAD_ADDRESS, LOAD_PRODUCT, LOAD_POOL, LOAD_ITEMTYPE, LOAD_ROUTE, ORDER_STATUS, SHIPMENT_STATUS, SYNC_DATE, LOAD_DRIVER, LOAD_FLEET, LOAD_OUTSTANDING_SHIPMENT, LOAD_SECTOR, LOAD_LOANTYPE, LOAD_TERMOFPAYMENT, LOAD_READY_ORDER, LOAD_ACCOUNT, LOAD_UNPAID_INVOICE, LOAD_COST_CENTER, LOAD_ACHIEVEMENTORDER } from "./types";

// Load Fleet Category
export const loadFleetCategory = () => async (dispatch) => {
  try {
    const res = await axios.get(`/fleetcategory?sort=description`);
    dispatch({
      type: LOAD_FLEETCATEGORY,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Fleet Type
export const loadFleetType = ({ filterSearch = "" }) => async (dispatch) => {
  try {
    var filter = qs.stringify(filterSearch);
    filter = filter.replaceAll("&", "|");
    filter = filter.replaceAll("=", ":");
    // console.log(`/fleettype?sort=description&filter=${filter}`);
    const res = await axios.get(`/fleettype?sort=description&filter=${filter}`);
    dispatch({
      type: LOAD_FLEETTYPE,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Fleet
export const loadFleet = ({ filterSearch = "" }) => async (dispatch) => {
  try {
    var filter = qs.stringify(filterSearch);
    filter = filter.replaceAll("&", "|");
    filter = filter.replaceAll("=", ":");
    const res = await axios.get(`/fleet?sort=description&filter=${filter}`);
    dispatch({
      type: LOAD_FLEET,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Driver
export const loadDriver = () => async (dispatch) => {
  try {
    const res = await axios.get(`/driver?sort=name`);
    dispatch({
      type: LOAD_DRIVER,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Loan Type
export const loadLoanType = () => async (dispatch) => {
  try {
    const res = await axios.get(`/loantype?sort=name`);
    dispatch({
      type: LOAD_LOANTYPE,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Category
export const loadCategory = () => async (dispatch) => {
  try {
    const res = await axios.get(`/category?sort=description`);
    dispatch({
      type: LOAD_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Industry
export const loadIndustry = () => async (dispatch) => {
  try {
    const res = await axios.get(`/industry?sort=description`);
    dispatch({
      type: LOAD_INDUSTRY,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

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
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Sector
export const loadSector = () => async (dispatch) => {
  try {
    const res = await axios.get(`/sector?sort=name`);
    dispatch({
      type: LOAD_SECTOR,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Address
export const loadAddress = () => async (dispatch) => {
  try {
    const res = await axios.get(`/address?sort=name`);
    dispatch({
      type: LOAD_ADDRESS,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Product
export const loadProduct = () => async (dispatch) => {
  try {
    const res = await axios.get(`/product?sort=description`);
    dispatch({
      type: LOAD_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Pool
export const loadPool = () => async (dispatch) => {
  try {
    const res = await axios.get(`/address?sort=description&filter=isPool:true`);
    dispatch({
      type: LOAD_POOL,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Item Type
export const loadItemType = () => async (dispatch) => {
  try {
    const res = await axios.get(`/itemtype?sort=name`);
    dispatch({
      type: LOAD_ITEMTYPE,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Term Of Payment
export const loadTermOfPayment = () => async (dispatch) => {
  try {
    const res = await axios.get(`/termOfPayment?sort=name`);
    dispatch({
      type: LOAD_TERMOFPAYMENT,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Account
export const loadAccount = () => async (dispatch) => {
  try {
    const res = await axios.get(`/account?sort=name`);
    dispatch({
      type: LOAD_ACCOUNT,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Cost Center
export const loadCostCenter = () => async (dispatch) => {
  try {
    const res = await axios.get(`/costCenter?sort=name`);
    dispatch({
      type: LOAD_COST_CENTER,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Route
export const loadRoute = () => async (dispatch) => {
  try {
    const res = await axios.get(`/route?sort=name`);
    dispatch({
      type: LOAD_ROUTE,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Get Distance
export const getDistance = ({ origin, destination, routeID }) => async (dispatch) => {
  try {
    const body = { origin, destination, routeID };
    const res = await axios.post(`/order/distance`, body);
    return Promise.resolve(res.data);
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Get Price
export const getPrice = ({ origin, destination, routeID, fleetTypeID, customerID, orderDetails }) => async (dispatch) => {
  try {
    const body = { origin, destination, routeID, fleetTypeID, customerID, orderDetails };
    // console.log(body);
    const res = await axios.post(`/order/price`, body);
    return Promise.resolve(res.data);
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Save Order Status
export const setOrderStatus = ({ id, status }) => async (dispatch) => {
  try {
    const body = { id, status };
    // console.log(body);
    const res = await axios.post(`/order/status`, body);
    dispatch({
      type: ORDER_STATUS,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Save Fleet Order Status
export const setFleetOrderStatus = ({ id, status }) => async (dispatch) => {
  try {
    const body = { id, status };
    const res = await axios.post(`/fleetOrder/status`, body);
    return Promise.resolve(res.data);
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Get Sync
export const getSync = () => async (dispatch) => {
  try {
    const res = await axios.get(`/setting?filter=code:sync`);
    dispatch({
      type: SYNC_DATE,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Outstanding Shipment
export const loadOutstandingShipment = ({ fleetTypeID, id }) => async (dispatch) => {
  try {
    const body = { fleetTypeID, id: id === undefined ? 0 : id };
    const res = await axios.post(`/shipment/outstanding`, body);
    dispatch({
      type: LOAD_OUTSTANDING_SHIPMENT,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Ready Order
export const loadReadyOrder = ({ customerID, id }) => async (dispatch) => {
  try {
    const body = { customerID, id: id === undefined ? 0 : id };
    const res = await axios.post(`/order/ready`, body);
    dispatch({
      type: LOAD_READY_ORDER,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Unpaid Invoice
export const loadUnpaidInvoice = ({ customerID, id }) => async (dispatch) => {
  try {
    const body = { customerID, id: id === undefined ? 0 : id };
    const res = await axios.post(`/invoice/unpaid`, body);
    dispatch({
      type: LOAD_UNPAID_INVOICE,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Sync Now
export const syncNow = () => async (dispatch) => {
  try {
    const res = await axios.get(`/helper/sync`);
    return Promise.resolve(res.data);
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

export const setShipmentStatus = ({ id, status }) => async (dispatch) => {
  try {
    const body = { id, status };
    const res = await axios.post(`/shipment/status`, body);
    dispatch({
      type: SHIPMENT_STATUS,
      payload: res.data,
    });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};

// Load Achievement Order
export const getAchievementOrder = ({ achievementStart, achievementEnd }) => async (dispatch) => {
  try {
    console.log(`/achievement-order?achievementStart=${achievementStart}&achievementEnd=${achievementEnd}`);
    const res = await axios.get(`/achievement-order?achievementStart=${achievementStart}&achievementEnd=${achievementEnd}`);
    return Promise.resolve(res.data);
    // dispatch({
    //   type: LOAD_ACHIEVEMENTORDER,
    //   payload: res.data,
    // });
  } catch (err) {
    let errMessage = "";
    if (err.message) errMessage = err.message;
    if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
    dispatch(setAlert(errMessage, "danger"));
  }
};



// // Get Price
// export const getPrice = ({ origin, destination, routeID, fleetTypeID, customerID, orderDetails }) => async (dispatch) => {
//   try {
//     const body = { origin, destination, routeID, fleetTypeID, customerID, orderDetails };
//     // console.log(body);
//     const res = await axios.post(`/order/price`, body);
//     return Promise.resolve(res.data);
//   } catch (err) {
//     let errMessage = "";
//     if (err.message) errMessage = err.message;
//     if (err.response && err.response.data && err.response.data.message) errMessage = err.response.data.message;
//     dispatch(setAlert(errMessage, "danger"));
//   }
// };