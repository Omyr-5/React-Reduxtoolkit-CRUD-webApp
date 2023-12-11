import { configureStore } from "@reduxjs/toolkit";
import userDetails from "../features/UserDetails";


export const store = configureStore({
    reducer: {
        user: userDetails
    }
})