import {configureStore} from "@reduxjs/toolkit"
import productSlice from "./slices/product/productSlice"
import userSlice from "./slices/user/userSlice"
import authSlice from "./slices/auth"
import catogarySlice from "./slices/catogary/CatogarySlice"
import SubcatogarySlice from "./slices/Subcatogary/Subcatogary"
const store = configureStore({
    reducer:{
        product: productSlice.reducer,
        auth: authSlice.reducer,
        userSlice: userSlice.reducer,
        catogary: catogarySlice.reducer,
        sub : SubcatogarySlice.reducer,
        
       

    }
})

export default store;