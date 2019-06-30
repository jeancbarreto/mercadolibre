export const type = "actionsBreadcrumb"
const actionsBreadcrumb = value => {
    return {
        type: type,
        payload: value
    }
}

export default actionsBreadcrumb