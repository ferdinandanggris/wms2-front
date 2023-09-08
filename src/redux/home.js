import {
  HOME_LIST_ITEM,
  HOME_SEARCH_ITEM,
  HOME_SPK_PENDING_LIST,
  HOME_SUMMARY,
  HOME_TOP_ITEM_TOTAL,
  HOME_WAREHOUSE_CAPACITY,
} from "../actions/types";

const initialState = {
  warehouseCapacity: null,
  summary: null,
  searchItem: null,
  listItems: null,
  spkPendingList: null,
};

export default function home(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case HOME_WAREHOUSE_CAPACITY:
      return { ...state, warehouseCapacity: payload };
    case HOME_SUMMARY:
      return { ...state, summary: payload };
    case HOME_SEARCH_ITEM:
      return { ...state, searchItem: payload };
    case HOME_SPK_PENDING_LIST:
      return { ...state, spkPendingList: payload };
    case HOME_TOP_ITEM_TOTAL:
      return { ...state, topItemsTotal: payload };
    case HOME_LIST_ITEM:
      return { ...state, listItems: payload };
    default:
      return state;
  }
}
