export const AuthReducer = (state, action) => {
    const { type, payload } = action;
    const { isAuthenticated, user } = payload;
    switch (type) {
        case "SET_AUTH":
            return { ...state, authLoading: false, isAuthenticated, user };

        default:
            return state;
    }
};
