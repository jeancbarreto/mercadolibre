export const type = "actionsView"
const actionsView = value => {
    return {
        type: type,
        payload: value
    }
}

export default actionsView