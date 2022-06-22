import { userConstants } from "../_constants";

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users,
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.GETPART_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GETPART_SUCCESS:
      return {
        items: action.users,
      };
    case userConstants.GETPART_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.GETGRID_REQUEST:
      return {
        loading: true,
      };
    case userConstants.GETGRID_SUCCESS:
      return {
        items: action.users,
      };
    case userConstants.GETGRID_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
