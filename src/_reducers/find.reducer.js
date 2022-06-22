import { userConstants } from '../_constants';

export function find(state = {}, action) {
    switch (action.type) {
      case userConstants.FIND_REQUEST:
        return {
          loading: true
        };
      case userConstants.FIND_SUCCESS:
        return {
          items: action.find
        };
      case userConstants.FIND_FAILURE:
        return { 
          error: action.error
        };
      default:
        return state
    }
  }