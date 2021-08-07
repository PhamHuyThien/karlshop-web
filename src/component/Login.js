import {autoLoading, showLoading, hideLoading} from "../redux/LoadingSlice";
import {setToken, setInfo} from "../redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import {useState} from "react";
import Request from "../utils/Request";
import API from "../utils/API";
import Swal from "sweetalert2";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";
function Login() {

    const history = useHistory();
    const user = useSelector((state)=>state.user);    
    const dispatch = useDispatch();
    const [input, setInput] = useState({username: "", password: ""});

    useEffect(()=>{
        if(user.token!=null){
            history.push("/");
        }
    }, [user.token]);

    function onchangeInput(evt){
        setInput({
            ...input,
            [evt.target.name]: evt.target.value
        });
    }

    function onclickLoginHandler(evt) {
        evt.preventDefault();
        dispatch(showLoading());
        Request({
            url: API.POST_LOGIN,
            method: "POST",
            data: {
                username: input.username,
                password: input.password,
            }
        }, ({data})=>{
            dispatch(hideLoading());
            sessionStorage.setItem("token", data.token);
            Swal.fire({
                icon: data.status==0?'error':'success',
                title: data.status==0?'Oopts..':"OK..",
                html: data.message,
              }).then(()=>{
                  if(data.status==1){
                    dispatch(setToken(data.token));
					dispatch(setInfo(data.data));
                  }
              });
        });
    }
    
    return (
        <div>
            <div class="checkout_area mt-5 mb-5">
                <div class="container">
                    <div class="row justify-content-md-center">
                        <div class="col-md-10 col-sm-12">
                            <div class="checkout_details_area mt-50 clearfix">
                                <div class="cart-page-heading">
                                    <h3>Đăng nhập</h3>
                                    <p>Đăng nhập vào KarlShop</p>
                                </div>
                                <form>
                                    <div class="row justify-content-md-center">
                                        <div class="col-12 mb-3">
                                            <label for="phone_number">Tài khoản <span>*</span></label>
                                            <input type="text" class="form-control" name="username" onChange={(evt)=>onchangeInput(evt)} value={input.username}/>
                                        </div>
                                        <div class="col-12 mb-4">
                                            <label for="email_address">Mật khẩu <span>*</span></label>
                                            <input type="password" class="form-control" name="password" onChange={(evt)=>onchangeInput(evt)} value={input.password}/>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 mt-3">
                                            <button class="btn karl-checkout-btn" onClick={(evt) => onclickLoginHandler(evt)}>Đăng nhập</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;