import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Request from "../utils/Request";
import API from "../utils/API";
import {showLoading, hideLoading} from "../redux/LoadingSlice";
import Swal from "sweetalert2";

function Register() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);
    const [form, setForm] = useState({firstname: "", lastname: "", username: "", password: "", email: "", confirmPassword: ""});

    useEffect(()=>{
        if(user.token!=null){
            history.push("/");            
        }
    }, [user]);

    function onChangeFormHandler(evt){
        setForm((form)=>{
            return {
                ...form,
                [evt.target.id]: evt.target.value
            };
        });
    }

    function onclickRegisterHandler(evt){
        evt.preventDefault();
        dispatch(showLoading());
        Request({
            url: API.POST_REGISTER,
            method: "POST",
            data: form
        }, ({data})=>{
            dispatch(hideLoading());
            Swal.fire({
                icon: data.status==0?'error':'success',
                title: data.status==0?'Oopts..':"OK..",
                html: data.message,
              }).then(()=>{
                  if(data.status==1){
                    history.push("/login");
                  }
              });
        });
    }

    return (
        <div>
            <div class="checkout_area mt-5 mb-5">
                <div class="container">
                    <div class="row justify-content-md-center">
                        <div class="col-sm-10 col-xs-12">
                            <div class="checkout_details_area mt-50 clearfix">
                                <div class="cart-page-heading">
                                    <h3>Đăng kí</h3>
                                    <p>Đăng kí một tài khoản mới!</p>
                                </div>
                                <form action="#" method="post">
                                    <div class="row justify-content-md-center">
                                        <div class="col-md-6 mb-3">
                                            <label for="first_name">Tên <span>*</span></label>
                                            <input type="text" class="form-control" id="firstname" onChange={onChangeFormHandler} value={form.firstname} required />
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="last_name">Họ <span>*</span></label>
                                            <input type="text" class="form-control" id="lastname" onChange={onChangeFormHandler} value={form.lastname} required />
                                        </div>
                                        <div class="col-12 mb-3">
                                            <label for="phone_number">Tài khoản <span>*</span></label>
                                            <input type="text" class="form-control" id="username" onChange={onChangeFormHandler} value={form.username} required/>
                                        </div>
                                        <div class="col-12 mb-4">
                                            <label for="email_address">Đại chỉ email <span>*</span></label>
                                            <input type="email" class="form-control" id="email" onChange={onChangeFormHandler} value={form.email} required />
                                        </div>
                                        <div class="col-12 mb-4">
                                            <label for="email_address">Mật khẩu <span>*</span></label>
                                            <input type="password" class="form-control" id="password" onChange={onChangeFormHandler} value={form.password} />
                                        </div>
                                        <div class="col-12 mb-4">
                                            <label for="email_address">Nhập lại mật khẩu <span>*</span></label>
                                            <input type="password" class="form-control" id="confirmPassword" onChange={onChangeFormHandler} value={form.confirmPassword} />
                                        </div>
                                        <div class="col-12">
                                            <div class="custom-control custom-checkbox d-block mb-2">
                                                <input type="checkbox" class="custom-control-input" id="customCheck1" checked/>
                                                <label class="custom-control-label" for="customCheck1">Đồng ý với điều khoản của chúng tôi</label>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 mt-3">
                                            <button class="btn karl-checkout-btn" onClick={(evt)=>onclickRegisterHandler(evt)}>Đăng kí</button>
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

export default Register;