import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../redux/LoadingSlice";
import { removeAll } from "../redux/ShoppingCartSlice";

import Swal from "sweetalert2";
import Utils from "../utils/Utils";
import Request from "../utils/Request";
import API from "../utils/API";

function Checkout() {
    const dispatch = useDispatch();
    const history = useHistory();

    const listProducts = useSelector(state => state.shoppingCart.listProducts);
    const user = useSelector(state => state.user);
    const [totalMoney, setTotalMoney] = useState(0);
    const [form, setForm] = useState({ firstname: "", lastname: "", andress: "", phone: "", email: "" });
    const [showSwal, setShowSwal] = useState(true);
    useEffect(() => {
        if (listProducts.length == 0 && showSwal) {
            Swal.fire({
                icon: "warning",
                title: "Oopts..",
                text: "Bạn chưa chọn món đồ nào!",
            }).then(() => {
            });
            history.push("/");
            return;
        }
        if (user.token == null) {
            Swal.fire({
                icon: "warning",
                title: "Oopts..",
                text: "Bạn cần đăng nhập trước đã!",
            }).then(() => {
            });
            history.push("/login");
            return;
        }
        if (listProducts.length != 0)
            setTotalMoney(listProducts.map(v => v.price * v.amount).reduce((total, v) => total + v));
        setForm({
            ...form,
            firstname: user.info.firstname,
            lastname: user.info.lastname,
            email: user.info.email,
        });
    }, [listProducts]);

    function onchangeFormHandler(evt) {
        setForm({
            ...form,
            [evt.target.id]: evt.target.value
        });
    }

    function placeOrderHandler() {
        dispatch(showLoading());
        let data = listProducts.map((v) => {
            return {
                id: v.id,
                title: v.title,
                amount: v.amount
            };
        });
        Request({
            url: API.POST_ORDER_ADD,
            method: "POST",
            data: data
        }, ({ data }) => {
            Swal.fire({
                icon: data.status == 0 ? 'error' : 'success',
                title: data.status == 0 ? 'Oopts..' : "OK..",
                html: data.message,
            }).then(() => {
                if (data.status == 1) {
                    setShowSwal(false);
                    dispatch(removeAll());
                    history.push("/");
                }
            });
            dispatch(hideLoading());
        });
    }

    return (
        <div>
            <div class="checkout_area section_padding_100">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <div class="checkout_details_area mt-50 clearfix">

                                <div class="cart-page-heading">
                                    <h5>Billing Address</h5>
                                    <p>Enter your cupone code</p>
                                </div>
                                <form action="#" method="post">
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="first_name">First Name <span>*</span></label>
                                            <input type="text" class="form-control" onChange={onchangeFormHandler} id="firstname" value={form.firstname} required />
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="last_name">Last Name <span>*</span></label>
                                            <input type="text" class="form-control" onChange={onchangeFormHandler} id="lastname" value={form.lastname} required />
                                        </div>
                                        <div class="col-12 mb-3">
                                            <label for="street_address">Address <span>*</span></label>
                                            <input type="text" class="form-control mb-3" onChange={onchangeFormHandler} id="andress" value={form.andress} />
                                        </div>
                                        <div class="col-12 mb-3">
                                            <label for="phone_number">Phone No <span>*</span></label>
                                            <input type="number" class="form-control" onChange={onchangeFormHandler} id="phone" min="0" value={form.phone} />
                                        </div>
                                        <div class="col-12 mb-4">
                                            <label for="email_address">Email Address <span>*</span></label>
                                            <input type="email" class="form-control" onChange={onchangeFormHandler} id="email" value={form.email} />
                                        </div>

                                        <div class="col-12">
                                            <div class="custom-control custom-checkbox d-block mb-2">
                                                <input type="checkbox" class="custom-control-input" id="customCheck1" checked />
                                                <label class="custom-control-label" for="customCheck1">Terms and conitions</label>
                                            </div>
                                            <div class="custom-control custom-checkbox d-block mb-2">
                                                <input type="checkbox" class="custom-control-input" id="customCheck2" checked />
                                                <label class="custom-control-label" for="customCheck2">Create an accout</label>
                                            </div>
                                            <div class="custom-control custom-checkbox d-block">
                                                <input type="checkbox" class="custom-control-input" id="customCheck3" checked />
                                                <label class="custom-control-label" for="customCheck3">Subscribe to our newsletter</label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="col-12 col-md-6 col-lg-5 ml-lg-auto">
                            <div class="order-details-confirmation">

                                <div class="cart-page-heading">
                                    <h5>Your Order</h5>
                                    <p>The Details</p>
                                </div>

                                <ul class="order-details-form mb-4">
                                    <li><span>Product</span> <span>Total</span></li>
                                    {
                                        listProducts.map((v) => {
                                            return (
                                                <li><span>{v.title}</span> <span>${Utils.formatMoney(v.price * v.amount)}</span></li>
                                            );
                                        })
                                    }
                                    <li><span>Subtotal</span> <span>${Utils.formatMoney(totalMoney)}</span></li>
                                    <li><span>Shipping</span> <span>Free</span></li>
                                    <li><span>Total</span> <span>${Utils.formatMoney(totalMoney)}</span></li>
                                </ul>


                                <div id="accordion" role="tablist" class="mb-4">
                                    <div class="card">
                                        <div class="card-header" role="tab" id="headingOne">
                                            <h6 class="mb-0">
                                                <a data-toggle="collapse" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne"><i class="fa fa-circle-o mr-3"></i>Paypal</a>
                                            </h6>
                                        </div>

                                        <div id="collapseOne" class="collapse" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div class="card-body">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra tempor so dales. Phasellus sagittis auctor gravida. Integ er bibendum sodales arcu id te mpus. Ut consectetur lacus.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" onClick={placeOrderHandler} class="btn karl-checkout-btn">Đặt hàng</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;