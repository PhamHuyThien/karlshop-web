import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Request from "../utils/Request";
import API from "../utils/API";
import { def, setInfo} from "../redux/UserSlice";

import { showLoading, hideLoading } from "../redux/LoadingSlice";
import Swal from "sweetalert2";

function Profile() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [form, setForm] = useState({ firstname: "", lastname: "", username: "", passwordOld: "", email: "", passwordNew: "" });

    useEffect(() => {
        if (user.token == null) {
            history.push("/");
            return;
        }
        setForm({
            firstname: user.info.firstname,
            lastname: user.info.lastname,
            username: user.info.username,
            passwordOld: "",
            passwordNew: "",
            email: user.info.email,
        });
    }, [user]);

    function onChangeFormHandler(evt) {
        setForm((form) => {
            return {
                ...form,
                [evt.target.id]: evt.target.value
            };
        });
    }

    function onclickUpdateProfileHandler(evt) {
        evt.preventDefault();
        dispatch(showLoading());
        Request({
            url: API.PUT_PROFILE,
            method: "PUT",
            data: {
                passwordOld: form.passwordOld,
                passwordNew: form.passwordNew,
                email: form.email,
                firstname: form.firstname,
                lastname: form.lastname,
            }
        }, ({ data }) => {
            dispatch(hideLoading());
            Swal.fire({
                icon: data.status == 0 ? 'error' : 'success',
                title: data.status == 0 ? 'Oopts..' : "OK..",
                html: data.message,
            }).then(() => {
                if (data.status == 1) {
                    dispatch(setInfo(data.data));
                    if (form.passwordNew.trim() != "") {
                        dispatch(def());
                    }
                }
            });
        });
    }

    return (
        <div>
            <div class="checkout_area mt-5 mb-5">
                <div class="container">
                    <div class="row justify-content-md-center">
                        <div class="col-sm-6 col-xs-12">
                            <div class="checkout_details_area mt-50 clearfix">
                                <img src="./assets/img/profile.jpg" class="img-fluid" style={{ width: "100%" }}></img>
                            </div>
                        </div>
                        <div class="col-sm-6 col-xs-12">
                            <div class="checkout_details_area mt-50 clearfix">
                                <div class="cart-page-heading">
                                    <h3>Tài khoản</h3>
                                    <p>Thông tin tài khoản của bạn</p>
                                </div>
                                <form>
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
                                            <label for="phone_number">Tài khoản <span style={{ fontSize: "10px" }}>(không thể thay đổi)</span><span>*</span></label>
                                            <input type="text" class="form-control" id="username" onChange={onChangeFormHandler} value={form.username} required disabled />
                                        </div>
                                        <div class="col-12 mb-4">
                                            <label for="email_address">Đại chỉ email <span>*</span></label>
                                            <input type="email" class="form-control" id="email" onChange={onChangeFormHandler} value={form.email} required />
                                        </div>
                                        <div class="col-12 mb-4">
                                            <label for="email_address">Mật khẩu cũ</label>
                                            <input type="password" class="form-control" id="passwordOld" onChange={onChangeFormHandler} value={form.passwordOld} />
                                        </div>
                                        <div class="col-12 mb-4">
                                            <label for="email_address">Mật khẩu mới</label>
                                            <input type="text" class="form-control" id="passwordNew" onChange={onChangeFormHandler} value={form.passwordNew} />
                                        </div>
                                        <div class="col-xs-12 col-sm-6 mt-3">
                                            <button class="btn karl-checkout-btn" onClick={(evt) => onclickUpdateProfileHandler(evt)}>Cập nhật</button>
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

export default Profile;