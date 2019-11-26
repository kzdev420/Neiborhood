export function setRequests(requests) {
    return {
        type: "SET_REQUESTS",
        payload: {
            requests: requests
        }
    }
}