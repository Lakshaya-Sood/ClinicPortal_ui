import { createStore, applyMiddleware } from 'redux'
//import thunkMiddleware from 'redux-thunk'
import reducer1 from './reducer1'
import reducer2 from './reducer2'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    reducer1,
    reducer2
  })

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState
    // ,
    // applyMiddleware(
    //   thunkMiddleware
    // )
  )
}
