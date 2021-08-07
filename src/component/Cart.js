
import HeaderBar from "./layout/HeaderBar";
import SectionDiscount from "./layout/section/SectionDiscount";
import FooterBar from "./layout/FooterBar";
import CartItem from "./layout/cart/CartItem";

import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {autoLoading, showLoading, hideLoading} from "../redux/LoadingSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Utils from "../utils/Utils";
import Request from "../utils/Request";
import API from "../utils/API";

function Cart() {
    const dispatch = useDispatch();
    const history = useHistory();
    const shoppingCart = useSelector((state)=>state.shoppingCart);
    const user = useSelector(state=> state.user);

    const [totalMoney, setTotalMoney] = useState(0);
    const [discount, setDiscount] = useState("");

    useEffect(()=>{
        if(shoppingCart.listProducts.length==0){
            Swal.fire({
                icon: "warning",
                title: "Oopts..",
                text: "Bạn chưa chọn món đồ nào!",
              }).then(()=>{
              });
            history.push("/");
            return;
        }
        if(user.token==null){

        }
        setTotalMoney(shoppingCart.listProducts.map(v=>v.price*v.amount).reduce((total, v)=>total+v));
    }, [shoppingCart.listProducts, user]);

    function onchangeDiscountHandler(evt){
        evt.preventDefault();
        setDiscount(evt.target.value);
    }

    function onclickApplyDiscountHandler(evt){
        evt.preventDefault();
        dispatch(showLoading());
        Request({
            url: API.POST_CHECK_DISCOUNT,
            method: "POST",
            data: {
                code: discount,
                listIdProductBuy: null
            }
        }, ({data})=>{
            dispatch(hideLoading());
            Swal.fire({
                icon: data.status==0?'error':'success',
                title: data.status==0?'Oopts..':"OK..",
                html: data.message,
              }).then(()=>{
              });
        })
    }
    function processCheckoutHandler(){
        dispatch(autoLoading(500));
        history.push("/cart/checkout");
    }
    return (
        <div class="cart_area section_padding_100 clearfix">
            <div class="container">
                <div class="row">
                    <CartItem></CartItem>
                </div>

                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="coupon-code-area mt-70">
                            <div class="cart-page-heading">
                                <h5>Cupon code</h5>
                                <p>Enter your cupone code</p>
                            </div>
                            <form>
                                <input type="search" id="discount" value={discount} onChange={(evt)=>onchangeDiscountHandler(evt)} placeholder="" />
                                <button type="submit" onClick={(evt)=>onclickApplyDiscountHandler(evt)}>Apply</button>
                            </form>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4">
                        {/* <div class="shipping-method-area mt-70">
                            <div class="cart-page-heading">
                                <h5>Shipping method</h5>
                                <p>Select the one you want</p>
                            </div>

                            <div class="custom-control custom-radio mb-30">
                                <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" />
                                <label class="custom-control-label d-flex align-items-center justify-content-between" for="customRadio1"><span>Next day delivery</span><span>$4.99</span></label>
                            </div>

                            <div class="custom-control custom-radio mb-30">
                                <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" />
                                <label class="custom-control-label d-flex align-items-center justify-content-between" for="customRadio2"><span>Standard delivery</span><span>$1.99</span></label>
                            </div>

                            <div class="custom-control custom-radio">
                                <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input" />
                                <label class="custom-control-label d-flex align-items-center justify-content-between" for="customRadio3"><span>Personal Pickup</span><span>Free</span></label>
                            </div>
                        </div> */}
                    </div>
                    <div class="col-12 col-lg-4">
                        <div class="cart-total-area mt-70">
                            <div class="cart-page-heading">
                                <h5>Cart total</h5>
                                <p>Final info</p>
                            </div>

                            <ul class="cart-total-chart">
                                <li><span>Subtotal</span> <span>${Utils.formatMoney(totalMoney)}</span></li>
                                <li><span>Shipping</span> <span>Free</span></li>
                                <li><span><strong>Total</strong></span> <span><strong>${Utils.formatMoney(totalMoney)}</strong></span></li>
                            </ul>
                            <a href="#" onClick={processCheckoutHandler} class="btn karl-checkout-btn">Proceed to checkout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;