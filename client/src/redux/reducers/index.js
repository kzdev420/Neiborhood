const initialState = { 
    requests: []
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_REQUESTS":
            return {
                ...state,
                requests: action.payload.requests
            }
       default:
           return state;
        }
} 