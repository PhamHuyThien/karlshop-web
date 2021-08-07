import ArrivalsDetail from "./arrivals/ArrivalsDetail";
import ArrivalsItem from "./arrivals/ArrivalsItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Request from "../../../utils/Request";
import API from "../../../utils/API";
import {showLoading, hideLoading, autoLoading} from "../../../redux/LoadingSlice";

function SectionArrivals() {
    const dispatch = useDispatch();
    const [listCategories, setListCategories] = useState([]);
    const [listProducts, setListProducts] = useState([]);
    const [detailProduct, setDetailProduct] = useState({});    
    const [clicked, setClicked] = useState("active");
    
    useEffect(()=>{
        Request({
            url: API.GET_CATEGORY_NEW,
            method: "GET"
        },({data})=>{
            setListCategories(data.data);
            if(data.data.length>0){
                loadNewListProducts(data.data[0].id);
            }
        });
    }, []);

    function updateNewProduct(id_category){
        setListProducts([]);
        setClicked("");
        loadNewListProducts(id_category);
    }

    function loadNewListProducts(id_category){
        dispatch(autoLoading(500));
        // dispatch(showLoading());
        Request({
            url: API.GET_NEW_PRODUCT_FROM_ID_CATEGORY(id_category),
            method: "GET"
        }, ({data})=>{
            // dispatch(hideLoading());
            setListProducts(data.data);
        });
    }

    return (
        <div>
            <ArrivalsDetail product={detailProduct}></ArrivalsDetail>
            <section class="new_arrivals_area section_padding_100_0 clearfix">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="section_heading text-center">
                                <h2>Sản phẩm mới</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="karl-projects-menu mb-100">
                    <div class="text-center portfolio-menu">
                        {
                            listCategories.map((category, id)=>{
                                return (<button key={id} onClick={() => updateNewProduct(category.id)} className={ "btn "+(id==0?clicked:"")}>{category.name}</button>);
                            })
                        }                    
                        <button class="btn">ALL</button>
                    </div>
                </div>

                <div class="container">
                    <div class="row">
                        {
                            listProducts.map((product, id)=>{
                                return (
                                    <ArrivalsItem key={id} product={product} setDetailProduct={setDetailProduct}></ArrivalsItem>
                                );
                            })
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SectionArrivals;