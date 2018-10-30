import {combineReducers} from 'redux'
import testReducers from '../../features/testarea/testReducer'
import eventReducer from '../../features/event/eventReducer'

const rootReducer = combineReducers({
  test: testReducers,
  events: eventReducer
});

export default rootReducer;