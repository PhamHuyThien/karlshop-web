import {configureStore} from "@reduxjs/toolkit";
import LoadingReducer from "./LoadingSlice";
import UserSlice from "./UserSlice";
import ShoppingCartSlice from "./ShoppingCartSlice";
const ConfigureStore =  configureStore({
    reducer: {
        loading: LoadingReducer,
        user: UserSlice,
        shoppingCart: ShoppingCartSlice
    }
});

export default ConfigureStore;
