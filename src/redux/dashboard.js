import { DASHBOARD_ACHIEVEMENT, DASHBOARD_DOCUMENTSTATUS, DASHBOARD_FLEETORDER, DASHBOARD_FLEETSTATUS } from "../actions/types";

const initialState = {
  achievement: null,
  fleetOrder: null,
  fleetStatus: null,
  documentStatus: null,
};

export default function dashboard(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DASHBOARD_ACHIEVEMENT:
      return { ...state, achievement: payload };
    case DASHBOARD_FLEETORDER:
      return { ...state, fleetOrder: payload };
    case DASHBOARD_FLEETSTATUS:
      return { ...state, fleetStatus: payload };
    case DASHBOARD_DOCUMENTSTATUS:
      return { ...state, documentStatus: payload };
    default:
      return state;
  }
}
