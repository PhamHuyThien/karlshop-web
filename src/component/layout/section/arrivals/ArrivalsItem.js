import API from "../../../../utils/API";
import Utils from "../../../../utils/Utils";
import {useSelector, useDispatch} from "react-redux";
import {push} from "../../../../redux/ShoppingCartSlice";
import {autoLoading} from "../../../../redux/LoadingSlice";
import { useEffect, useState } from "react";

function ArrivalsItem({
    product, setDetailProduct
}) {
    const dispatch = useDispatch();
    const shoppingCart = useSelector((state)=>state.shoppingCart);

    function setDetailProductHandler(product){
        let pr = shoppingCart.listProducts.filter(v=>v.id==product.id);
        if(pr.length>0){
            setDetailProduct(pr[0]);
        }else{
            setDetailProduct({...product, amount: 0});
        }
    }

    function addToCartHandler(evt, product){
        evt.preventDefault();
        dispatch(autoLoading(200));
        dispatch(push(product));
    }

    return (
        <div class="col-12 col-sm-6 col-md-4 single_gallery_item women wow fadeInUpBig" data-wow-delay="0.2s">
            <div class="product-img">
                <img src={API.HOST + product.img} alt="" />
                <div class="product-quicview">
                    <a href="#" onClick={()=>setDetailProductHandler(product)} data-toggle="modal" data-target="#quickview"><i class="ti-plus"></i></a>
                </div>
            </div>
            <div class="product-description">
                <h4 class="product-price">${Utils.formatMoney(product.price)}</h4>
                <p>{product.title}</p>
                <button onClick={(evt)=>addToCartHandler(evt, product)} class="add-to-cart-btn" style={{border:"none", background: "#fff"}}>Thêm vào giỏ hàng</button>
            </div>
        </div>
    );
}

export default ArrivalsItem;