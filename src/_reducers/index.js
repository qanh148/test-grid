import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { find } from './find.reducer';
import { count } from './count.reducer';
import { update } from './update.reducer';
import { uploadImg } from './uploadImg.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  find,
  count,
  update,
  uploadImg
});

export default rootReducer;