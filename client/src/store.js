import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import sitesReducer from './reducers/sitesReducer';

// const defaultState = {
//     defaultCityCode: 215854,
//     metricUnits: 'metric',
//     theme: 'dark',
// }
function metricUnits(state = 'metric', action) {
    return state
}
function defaultState(state = {}, action) {

    return {
        defaultCityCode: metricUnits(state.metricUnits, action),
        //b: b(state.b, action)
    }
}
const store = createStore(
    combineReducers({
        sitesReducer,
        defaultState
    }),
    {},
    applyMiddleware(thunk)
)

export default store;