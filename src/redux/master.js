import { LOAD_MODULE, LOAD_ROLE,LOAD_PALLET, LOAD_USER, LOAD_FLEETTYPE, LOAD_FLEETCATEGORY, LOAD_CATEGORY, LOAD_UOM, LOAD_INDUSTRY, LOAD_CUSTOMER, LOAD_ADDRESS, ORDER_STATUS, LOAD_PRODUCT, LOAD_POOL, LOAD_ITEMTYPE, LOAD_ROUTE, SYNC_DATE, LOAD_DRIVER, LOAD_FLEET, LOAD_OUTSTANDING_SHIPMENT, LOAD_SECTOR, LOAD_LOANTYPE, LOAD_TERMOFPAYMENT, LOAD_READY_ORDER, LOAD_ACCOUNT, LOAD_UNPAID_INVOICE, LOAD_COST_CENTER, LOAD_WAREHOUSE, LOAD_ITEM, LOAD_PACKING, LOAD_GROUP, LOAD_VENDOR } from "../actions/types";

const initialState = {
  user: null,
  role: null,
  module: null,
  fleetCategory: null,
  fleetType: null,
  fleet: null,
  driver: null,
  category: null,
  costCenter: null,
  industry: null,
  customer: null,
  packing: null,
  sector: null,
  address: null,
  product: null,
  termOfPayment: null,
  account: null,
  pool: null,
  itemType: null,
  loanType: null,
  route: null,
  shipment: null,
  unpaid: null,
  sync: null,
  item: null,
  order: null,
  warehouse: null,
  group: null,
  uom: null,
  vendor: null,

  pallet: null,
  location: null,
  batch: null,
  shipping: null,
  shippingDetail: null,
  customerDetail: null,

};

export default function master(state = initialState, action) {
  const { type, payload } = action;

  // console.log(payload);
  switch (type) {
    case LOAD_WAREHOUSE:
      return { ...state, warehouse: payload.data };
    case LOAD_GROUP:
      return { ...state, group: payload.data };
    case LOAD_USER:
      return { ...state, user: payload.data };
    case LOAD_ROLE:
      return { ...state, role: payload.data };
    case LOAD_MODULE:
      return { ...state, module: payload.data };
      case LOAD_VENDOR:
        return { ...state, vendor: payload.data };
        case LOAD_PALLET:
          return { ...state, pallet: payload.data };
  

    // ICE
    case LOAD_FLEETCATEGORY:
      return { ...state, fleetCategory: payload.data };
    case LOAD_FLEETTYPE:
      return { ...state, fleetType: payload.data };
    case LOAD_FLEET:
      return { ...state, fleet: payload.data };
    case LOAD_DRIVER:
      return { ...state, driver: payload.data };
    case LOAD_INDUSTRY:
      return { ...state, industry: payload.data };
    case LOAD_CUSTOMER:
      return { ...state, customer: payload.data };
    case LOAD_SECTOR:
      return { ...state, sector: payload.data };
    case LOAD_ADDRESS:
      return { ...state, address: payload.data };
    case LOAD_PRODUCT:
      return { ...state, product: payload.data };
    case LOAD_TERMOFPAYMENT:
      return { ...state, termOfPayment: payload.data };
    case LOAD_ACCOUNT:
      return { ...state, account: payload.data };
    case LOAD_COST_CENTER:
      return { ...state, costCenter: payload.data };
    case LOAD_POOL:
      return { ...state, pool: payload.data };
    case LOAD_ITEMTYPE:
      return { ...state, itemType: payload.data };
    case LOAD_LOANTYPE:
      return { ...state, loanType: payload.data };
    case LOAD_ROUTE:
      return { ...state, route: payload.data };
    case LOAD_READY_ORDER:
      return { ...state, ready: payload };
    case LOAD_UNPAID_INVOICE:
      return { ...state, unpaid: payload };
    case LOAD_OUTSTANDING_SHIPMENT:
      return { ...state, shipment: payload };
    case LOAD_ITEM:
      return { ...state, item: payload };
    case LOAD_CATEGORY:
      return { ...state, category: payload.data };
    case LOAD_PACKING:
      return { ...state, packing: payload.data };
    case LOAD_UOM:
      return { ...state, uom: payload.data };
    case SYNC_DATE:
      return { ...state, sync: payload.data.length > 0 ? payload.data[0] : null };

    case ORDER_STATUS:
      return { ...state, order: payload.data };
    default:
      return state;
  }
}
