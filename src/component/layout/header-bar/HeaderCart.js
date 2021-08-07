import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {autoLoading} from "../../../redux/LoadingSlice";

function HeaderCart(){
    const dispatch = useDispatch();
    const history = useHistory();
    const len = useSelector((state)=>state.shoppingCart.listProducts.length);

    function onclickCartHandler() {
        dispatch(autoLoading(500));
        history.push("/cart");
    }

    return (
        <a href="#" id="header-cart-btn" onClick={onclickCartHandler}>
            {
                len>0 ? (
                    <span class="cart_quantity">{len}</span> 
                ) : (<span></span>)
            }
            
            <i class="ti-bag"></i> 
            Giỏ hàng
        </a>
    );
}

export default HeaderCart;