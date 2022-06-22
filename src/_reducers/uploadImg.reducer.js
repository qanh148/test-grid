import { userConstants } from '../_constants';

export function uploadImg(state = {}, action) {
    switch (action.type) {
      case userConstants.UPLOADIMG_REQUEST:
        return {
          loading: true
        };
      case userConstants.UPLOADIMG_SUCCESS:
        return {
          items: action.uploadImg
        };
      case userConstants.UPLOADIMG_FAILURE:
        return { 
          error: action.error
        };
      default:
        return state
    }
  }