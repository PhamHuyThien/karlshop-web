import { createSlice } from "@reduxjs/toolkit";


const ShoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: {
        listProducts: []
    },
    reducers: {
        set: (state, action) => {
            state.listProducts = action.payload;
        },
        push: (state, action) => {
            let product_push = action.payload;
            let id_push = product_push.id;
            if (state.listProducts.filter(v => v.id == id_push).length > 0) {
                state.listProducts = state.listProducts.map((v) => {
                    if (v.id == id_push) {
                        v.amount += 1;
                    }
                    return v;
                });
            } else {
                state.listProducts.push({ ...product_push, amount: 1 });
            }
        },
        remove: (state, action) => {
            let id = action.payload;
            state.listProducts = state.listProducts.filter((v, i) => v.id != id);
        },
        down: (state, action) => {
            let id = action.payload;
            state.listProducts = state.listProducts.map((v) => {
                if (v.id == id && v.amount > 0) {
                    v.amount -= 1;
                }
                return v;
            });
        },
        removeAll: (state) => {
            state.listProducts = [];
        }
    }
});

export const { set, push, down, remove, removeAll } = ShoppingCartSlice.actions;
export default ShoppingCartSlice.reducer;
