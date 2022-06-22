import { userConstants } from '../_constants';

export function count(state = {}, action) {
    switch (action.type) {
      case userConstants.COUNT_REQUEST:
        return {
          loading: true
        };
      case userConstants.COUNT_SUCCESS:
        return {
          items: action.count
        };
      case userConstants.COUNT_FAILURE:
        return { 
          error: action.error
        };
      default:
        return state
    }
  }