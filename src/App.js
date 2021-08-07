import { BrowserRouter, Switch, Route } from "react-router-dom";

import Index from "./component/Index";
import Loading from "./component/layout/Loading";

import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading} from "./redux/LoadingSlice";
import {setInfo, setToken, def} from "./redux/UserSlice";
import Swal from "sweetalert2";
import Request from "./utils/Request";

import API from "./utils/API";

import {useEffect, useState} from "react";
import {set} from "./redux/ShoppingCartSlice";
import { miniSerializeError } from "@reduxjs/toolkit";

function App() {
	const dispatch = useDispatch();
	const user = useSelector((state)=>state.user);
	const [checkTokenHandl, setCheckTokenHandl] = useState(null);

	useEffect(()=>{
		if(sessionStorage.getItem("token")!=null){
			dispatch(showLoading());
			checkToken();
		}
	}, []);	

	useEffect(()=>{
		if(user.token!=null){
			if(checkTokenHandl==null){
				setCheckTokenHandl(setInterval(checkToken, 10000));
			}
		}else{
			clearInterval(checkTokenHandl);
			setCheckTokenHandl(null);
		}
	}, [user.token]);

	function checkToken(){
		Request({
			url: API.GET_PROFILE,
			method: "GET",
		}, ({data})=>{
			if(data.status != 1){
				dispatch(def());
				sessionStorage.setItem("token", null);
				clearInterval(checkTokenHandl);
				setCheckTokenHandl(null);
			}
			if(data.status==1 && user.token==null){
				dispatch(setToken(data.token));
				dispatch(setInfo(data.data));
			}
			dispatch(hideLoading());
		});
	}


	return (
		<div>
			<Loading></Loading>
			<BrowserRouter>
				<Switch>
					<Route path="/" >
						<Index></Index>
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
