import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { projects } from './projects.reducer';
import { project } from './project.reducer';
import { files } from './files.reducers';
import { billing } from './billing.reducers';
import { account } from './account.reducers';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  projects,
  project,
  files,
  billing,
  account
});

export default rootReducer;