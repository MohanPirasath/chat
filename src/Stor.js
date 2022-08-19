import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import APIs from "./utils/API";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";


// reducers
const reducer = combineReducers({
    user: userSlice,
    [APIs.reducerPath]: APIs.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    blackList: [APIs.reducerPath],
};

// persist our store

const persistedReducer = persistReducer(persistConfig, reducer);

// creating the store

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, APIs.middleware],
});

export default store;