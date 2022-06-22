import { userConstants } from '../_constants';

export function update(state = {}, action) {
    switch (action.type) {
      case userConstants.UPDATE_REQUEST:
        return {
          loading: true
        };
      case userConstants.UPDATE_SUCCESS:
        return {
          items: action.update
        };
      case userConstants.UPDATE_FAILURE:
        return { 
          error: action.error
        };
      default:
        return state
    }
  }