import { createSlice } from "@reduxjs/toolkit";

export const LoadingSlice = createSlice({
    name: "loading",
    initialState: {
        show: false
    },
    reducers: {
        showLoading: state => {
            state.show = true;
        },
        hideLoading: state => {
            state.show = false;
        }
    }
});

export const autoLoading = (timeout = 3000, callback=()=>{}) => dispatch => {
    dispatch(showLoading());
    setTimeout(() => {
        dispatch(hideLoading());
        callback();
    }, timeout);
}

export const { showLoading, hideLoading } = LoadingSlice.actions;

export default LoadingSlice.reducer;