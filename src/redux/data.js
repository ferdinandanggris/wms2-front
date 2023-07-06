import { LOAD_DATA, REFRESH_DATA, ADD_DATA, EDIT_DATA, EXPORT_DATA } from "../actions/types";

const initialState = {
  list: null,
  data: null,
  export: null,
  module: "",
  total: 0,
  page: 0,
  loading: true,
};

export default function data(state = initialState, action) {
  const { type, payload, module } = action;

  switch (type) {
    case REFRESH_DATA:
      return {
        ...state,
        list: payload.data,
        total: payload.total,
        data: null,
        page: payload.page,
        module: module,
        loading: false,
      };
    case EXPORT_DATA:
      return {
        ...state,
        export: payload.data,
        module: module,
        loading: false,
      };
    case LOAD_DATA:
    case ADD_DATA:
    case EDIT_DATA:
      return {
        ...state,
        data: payload.data,
        module: module,
        loading: false,
      };
    default:
      return state;
  }
}
