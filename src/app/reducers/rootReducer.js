import {combineReducers} from 'redux'
import testReducers from '../../features/testarea/testReducer'
import eventReducer from '../../features/event/eventReducer'
import modalsReducer from '../../features/modals/modalReducer'
import authReducer from '../../features/auth/authReducer'
import {reducer as FormReducer} from 'redux-form'

const rootReducer = combineReducers({
  test: testReducers,
  events: eventReducer,
  form: FormReducer,
  modals: modalsReducer,
  auth: authReducer
});

export default rootReducer;