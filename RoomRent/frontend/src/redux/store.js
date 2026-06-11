import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./authSlice"
import userReducer from "./userSlice"
import themeReducer from "./themeSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        user:userReducer,
        theme: themeReducer,
    }

})