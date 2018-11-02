import {combineReducers} from 'redux'
import {reducer as toastrReducer} from 'react-redux-toastr'
import testReducers from '../../features/testarea/testReducer'
import eventReducer from '../../features/event/eventReducer'
import modalsReducer from '../../features/modals/modalReducer'
import authReducer from '../../features/auth/authReducer'
import asyncReducer from '../../features/async/asyncReducer'
import {firebaseReducer} from 'react-redux-firebase'
import {firestoreReducer} from 'redux-firestore'
import {reducer as FormReducer} from 'redux-form'


const rootReducer = combineReducers({
  test: testReducers,
  events: eventReducer,
  form: FormReducer,
  modals: modalsReducer,
  auth: authReducer,
  async: asyncReducer,
  toastr: toastrReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer ;