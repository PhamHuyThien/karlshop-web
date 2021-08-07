
import { useHistory } from "react-router-dom";

import Swal from "sweetalert2";
import {def} from "../../redux/UserSlice";
import {useDispatch, useSelector} from "react-redux";
import HeaderCart from "./header-bar/HeaderCart";
import {autoLoading} from "../../redux/LoadingSlice";

function HeaderBar() {
    const user = useSelector((state)=>state.user);
    const shoppingCart = useSelector((state)=>state.shoppingCart);

    const history = useHistory();
    const dispatch = useDispatch();

    function onclickCartHandler() {
        dispatch(autoLoading(500));
        history.push("/cart");
    }

    function onclickLoginHandler() {
        dispatch(autoLoading(500));
        history.push("/login");
    }

    function onclickRegisterHandler() {
        dispatch(autoLoading(500));
        history.push("/register");
    }

    function onclickCheckoutHandler() {
        dispatch(autoLoading(500));
        history.push("/cart/checkout");
    }
    
    function onclickProfileHandler(){
        dispatch(autoLoading(500));
        history.push("/profile");
    }
    
    function onclickBillHandler(){
        dispatch(autoLoading(500));
        history.push("/bill");
    }

    function onclickHomeHandler() {
        dispatch(autoLoading(500));
        history.push("/");
    }

    function onclickLogoutHandler(){
        Swal.fire({
            icon: "warning",
            title: "Đăng xuất?",
            text: "Bạn chắc chắn muốn đăng xuất chứ?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy"
          }).then(result=>{
              if(result.isConfirmed){
                    dispatch(autoLoading(500));
                    sessionStorage.setItem("token", null);
                    dispatch(def());
              }
          });
    }
    return (
        <header class="header_area bg-img background-overlay-white">
            <div class="top_header_area">
                <div class="container h-100">
                    <div class="row h-100 align-items-center justify-content-end">
                        <div class="col-12 col-lg-7">
                            <div class="top_single_area d-flex align-items-center">
                                <div class="top_logo">
                                    <a href="#" onClick={onclickHomeHandler}><img src="assets/img/core-img/logo.png" alt="" /></a>
                                </div>
                                <div class="header-cart-menu d-flex align-items-center ml-auto">
                                    <div class="cart">
                                        <span style={{paddingRight: "10px", fontWeight: "bold"}}>{user.info.firstname+" "+user.info.lastname}</span>
                                        <HeaderCart></HeaderCart>
                                        {/* <ul class="cart-list">
                                             <li>
                                                <a href="#" class="image"><img src="img/product-img/product-10.jpg" class="cart-thumb" alt="" /></a>
                                                <div class="cart-item-desc">
                                                    <h6><a href="#">Women's Fashion</a></h6>
                                                    <p>1x - <span class="price">$10</span></p>
                                                </div>
                                                <span class="dropdown-product-remove"><i class="icon-cross"></i></span>
                                            </li>
                                            <li>
                                                <a href="#" class="image"><img src="img/product-img/product-11.jpg" class="cart-thumb" alt="" /></a>
                                                <div class="cart-item-desc">
                                                    <h6><a href="#">Women's Fashion</a></h6>
                                                    <p>1x - <span class="price">$10</span></p>
                                                </div>
                                                <span class="dropdown-product-remove"><i class="icon-cross"></i></span>
                                            </li>
                                            <li class="total">
                                                <span class="pull-right">Total: $20.00</span>
                                                <a href="cart.html" class="btn btn-sm btn-cart">Cart</a>
                                                <a href="checkout-1.html" class="btn btn-sm btn-checkout">Checkout</a>
                                            </li>
                                        </ul> */}
                                    </div>
                                    {/* <div class="header-right-side-menu ml-15">
                                        <a href="#" id="sideMenuBtn"><i class="ti-menu" aria-hidden="true"></i></a>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main_header_area">
                <div class="container h-100">
                    <div class="row h-100">
                        <div class="col-12 d-md-flex justify-content-between">
                            <div class="header-social-area">
                                <a href="#"><span class="karl-level">Share</span> <i class="fa fa-pinterest" aria-hidden="true"></i></a>
                                <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                                <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                                <a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
                            </div>
                            <div class="main-menu-area">
                                <nav class="navbar navbar-expand-lg align-items-start">
                                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#karl-navbar" aria-controls="karl-navbar" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"><i class="ti-menu"></i></span></button>
                                    <div class="collapse navbar-collapse align-items-start collapse" id="karl-navbar">
                                        <ul class="navbar-nav animated" id="nav">
                                            <li class="nav-item active"><a class="nav-link" href="#" onClick={onclickHomeHandler}>Trang chủ</a></li>
                                            <li class="nav-item dropdown">
                                                <a class="nav-link dropdown-toggle" href="#" id="karlDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Giỏ hàng</a>
                                                <div class="dropdown-menu" aria-labelledby="karlDropdown">
                                                    <a class="dropdown-item" href="#" onClick={onclickCartHandler}>Giỏ hàng</a>
                                                    <a class="dropdown-item" href="#" onClick={onclickCheckoutHandler}>Thanh toán</a>
                                                </div>
                                            </li>
                                            <li class="nav-item"><a class="nav-link" href="#">Quần áo</a></li>
                                            <li class="nav-item"><a class="nav-link" href="#"><span class="karl-level">hot</span> Giày</a></li>
                                            <li class="nav-item"><a class="nav-link" href="#">Đồng hồ</a></li>
                                            <li class="nav-item dropdown">
                                                <a class="nav-link dropdown-toggle" href="#" id="karlDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tài khoản</a>
                                                <div class="dropdown-menu" aria-labelledby="karlDropdown">
                                                    {
                                                        user.token==null ? (
                                                            <div>
                                                                <a class="dropdown-item" href="#" onClick={onclickLoginHandler}>Đăng nhập</a>
                                                                <a class="dropdown-item" href="#" onClick={onclickRegisterHandler}>Đăng kí</a>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <a class="dropdown-item" href="#" onClick={onclickProfileHandler}>Tài khoản</a>
                                                                <a class="dropdown-item" href="#" onClick={onclickBillHandler}>Hóa đơn</a>
                                                                <a class="dropdown-item" href="#" onClick={onclickLogoutHandler}>Đăng xuất</a>
                                                            </div>
                                                        )
                                                    }

                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                            <div class="help-line">
                                <a href="tel:+84941661235"><i class="ti-headphone-alt"></i> +84 941 66 1235</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderBar;