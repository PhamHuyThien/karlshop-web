import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        info:{
            username: "",
            password: "",
            email: "",
            firstname: "",
            lastname: "",
            role: "",
            time: 0,
        },
        token: null
    },
    reducers: {
        setToken: (state, action)=>{
            state.token = action.payload;
        },
        setInfo: (state, action)=>{
            state.info = action.payload;
        },
        def: (state)=>{
            state.token = null;
            state.info.username = "";
            state.info.password = "";
            state.info.email = "";
            state.info.firstname = "";
            state.info.lastname = "";
            state.info.role = "";
            state.info.time = "";
        }
    }
});

export const { setToken, setInfo, def} = UserSlice.actions;

export default UserSlice.reducer;