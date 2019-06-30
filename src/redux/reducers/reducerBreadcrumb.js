import { type as actionsBreadcrumb } from '../actions/actionsBreadcrumb'
const defaultState = ["Producto"];

const reducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case actionsBreadcrumb:
            return payload
        default:
            return state
    }
}
export default reducer