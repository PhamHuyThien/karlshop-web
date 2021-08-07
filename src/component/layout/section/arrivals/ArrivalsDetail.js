import API from "../../../../utils/API";
import Utils from "../../../../utils/Utils";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {push, down, remove} from "../../../../redux/ShoppingCartSlice";
function ArrivalsDetail({
    product
}) {
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);

    useEffect(()=>{
        setCount(product.amount);
    }, [product]);

    function setDownUpCount(evt, type){
        evt.preventDefault();
        switch(type){
            case "up":                
                dispatch(push(product));
                setCount(count+1);
                break;
            case "down":
                if(count>1){
                    dispatch(down(product.id));
                    setCount(count-1);
                }else if(count==1){
                    dispatch(remove(product.id));
                    setCount(count-1);
                }
                break;
        }
    }
    return (
        <div class="modal fade" id="quickview" tabindex="-1" role="dialog" aria-labelledby="quickview" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <button type="button" class="close btn" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="modal-body">
                        <div class="quickview_body">
                            <div class="container">
                                <div class="row">
                                    <div class="col-12 col-lg-5">
                                        <div class="quickview_pro_img">
                                            <img src={API.HOST + product.img} alt="" />
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-7">
                                        <div class="quickview_pro_des">
                                            <h4 class="title">{product.title}</h4>
                                            <div class="top_seller_product_rating mb-15">
                                                <i class="fa fa-star" aria-hidden="true"></i>
                                                <i class="fa fa-star" aria-hidden="true"></i>
                                                <i class="fa fa-star" aria-hidden="true"></i>
                                                <i class="fa fa-star" aria-hidden="true"></i>
                                                <i class="fa fa-star" aria-hidden="true"></i>
                                            </div>
                                            <h5 class="price">${Utils.formatMoney(product.price)} <span>${Utils.formatMoney(product.price+1000)}</span></h5>
                                            <p>{product.des}</p>
                                            <a href="#">Xem chi tiết sản phẩm</a>
                                        </div>
                                        <form class="cart">
                                            <div class="quantity">
                                                <span class="qty-minus" onClick={(evt)=>setDownUpCount(evt, "down")}><i class="fa fa-minus" aria-hidden="true"></i></span>

                                                <input type="number" class="qty-text" id="qty" value={count} />

                                                <span class="qty-plus" onClick={(evt)=>setDownUpCount(evt, "up")} ><i class="fa fa-plus" aria-hidden="true"></i></span>
                                            </div>
                                            <button type="submit" onClick={(evt)=>setDownUpCount(evt, "up")} class="cart-submit">Thêm vào giỏ hàng</button>
                                            <div class="modal_pro_wishlist">
                                                <a href="#" target="_blank"><i class="ti-heart"></i></a>
                                            </div>
                                            <div class="modal_pro_compare">
                                                <a href="#" target="_blank"><i class="ti-stats-up"></i></a>
                                            </div>
                                        </form>

                                        <div class="share_wf mt-30">
                                            <p>Chia sẻ cho bạn bè</p>
                                            <div class="_icon">
                                                <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                                                <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                                                <a href="#"><i class="fa fa-pinterest" aria-hidden="true"></i></a>
                                                <a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArrivalsDetail;