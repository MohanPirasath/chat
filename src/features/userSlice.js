import {createSlice} from "@reduxjs/toolkit"
import APIs from "../utils/API"


export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addNotifications: (state, { payload }) => {
            if (state.newMessages[payload]) {
                state.newMessages[payload] = state.newMessages[payload] + 1;
            } else {
                state.newMessages[payload] = 1;
            }
        },
        resetNotifications: (state, { payload }) => {
            delete state.newMessages[payload];
        },
    },

    extraReducers: (builder) => {
        // save user after signup
        builder.addMatcher(APIs.endpoints.signupUser.matchFulfilled, (state, { payload }) => payload);
        // save user after login
        builder.addMatcher(APIs.endpoints.loginUser.matchFulfilled, (state, { payload }) => payload);
        // logout: destroy user session
        builder.addMatcher(APIs.endpoints.logoutUser.matchFulfilled, () => null);
    },
});

export const { addNotifications, resetNotifications } = userSlice.actions;
export default userSlice.reducer;