

// export const APIs = "http://localhost:5000";

// export const registerRoute = `${APIs}/api/auth/register`
// export const loginrRoute = `${APIs}/api/auth/login`
// export const avatarRoute = `${APIs}/api/auth/setAvatar`
// export const allUsersRoute = `${APIs}/api/auth/allUsers`

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// define a service user a base URL

const APIs = createApi({
    reducerPath: "APIs",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://chatme-app-project4.herokuapp.com",
    }),

    endpoints: (builder) => ({
        // creating the user
        signupUser: builder.mutation({
            query: (user) => ({
                url: "/users/register",
                method: "POST",
                body: user,
            }),
        }),

        loginUser: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),
         logoutUser: builder.mutation({
            query: (payload) => ({
                url: "/logout",
                method: "DELETE",
                body: payload,
            }),
        }),
        }),
        })

        export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation } = APIs;

        export default APIs;
