import { type as actionsView } from '../actions/actionsView'
const defaultState = "home";

const reducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case actionsView:
            return payload
        default:
            return state
    }
}
export default reducer