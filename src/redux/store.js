import { createStore, combineReducers } from 'redux'
import reduceDocument from './reducers/reducerDocument'
import reduceBreadcrumbs from './reducers/reducerBreadcrumb'
import reduceView from './reducers/reducerView'

const reducer = combineReducers({
    reduceDocument,
    reduceView,
    reduceBreadcrumbs
})

const store = createStore(reducer)

export default store