import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {autoLoading} from "../../../redux/LoadingSlice";
import {removeAll} from "../../../redux/ShoppingCartSlice";
import Utils from "../../../utils/Utils";
import API from "../../../utils/API";
function CartItem(){
    const dispatch = useDispatch();
    const history = useHistory();
    
    const listProducts = useSelector(state=>state.shoppingCart.listProducts);

    function continueShoppingHandler(){
        dispatch(autoLoading());
        history.push("/");
    }
    function clearCartHandler(){
        dispatch(autoLoading(500));
        dispatch(removeAll());
        history.push("/");
    }

    return (
    <div class="col-12">
        <div class="cart-table clearfix">
            <table class="table table-responsive">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listProducts.map((v, i)=>{
                        return (<tr key={i}>
                            <td class="cart_product_img d-flex align-items-center">
                                <a href="#"><img src={API.HOST+v.img} alt="Product" /></a>
                                <h6>{v.title}</h6>
                            </td>
                            <td class="price"><span>${Utils.formatMoney(v.price)}</span></td>
                            <td class="qty">
                                <div class="quantity">
                                    <span class="qty-minus" ><i class="fa fa-minus" aria-hidden="true"></i></span>
                                    <input type="number" class="qty-text" id="qty" value={Utils.formatMoney(v.amount)} />
                                    <span class="qty-plus" ><i class="fa fa-plus" aria-hidden="true"></i></span>
                                </div>
                            </td>
                            <td class="total_price"><span>${Utils.formatMoney(v.price*v.amount)}</span></td>
                        </tr>);
                        })
                    }
                    
                </tbody>
            </table>
        </div>

        <div class="cart-footer d-flex mt-30">
            <div class="back-to-shop w-50">
                <a href="#" onClick={continueShoppingHandler}>Continue shooping</a>
            </div>
            <div class="update-checkout w-50 text-right">
                <a href="#" onClick={clearCartHandler}>clear cart</a>
            </div>
        </div>

    </div>
    );
}

export default CartItem;