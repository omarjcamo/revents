import {combineReducers} from 'redux'
import testReducers from '../../features/testarea/testReducer'
import eventReducer from '../../features/event/eventReducer'
import {reducer as FormReducer} from 'redux-form'

const rootReducer = combineReducers({
  test: testReducers,
  events: eventReducer,
  form: FormReducer
});

export default rootReducer;