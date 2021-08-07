const HOST = "http://localhost:8080";
const API_ROOT = HOST+"/api/v1";
const API = {
    HOST: HOST,
    API: API_ROOT,
    GET_PROFILE : API_ROOT+"/profile",
    POST_LOGIN: API_ROOT+"/login",
    GET_CATEGORY_NEW: API_ROOT+"/category/all",
    GET_ALL_PRODUCT_FROM_ID_CATEGORY: (id)=> API_ROOT+`/category/${id}/product/all`,
    GET_NEW_PRODUCT_FROM_ID_CATEGORY: (id)=> API_ROOT+`/category/${id}/product/new`,
    POST_ORDER_ADD: API_ROOT +"/order/add",
    POST_CHECK_DISCOUNT: API_ROOT+"/discount/check",
    POST_REGISTER: API_ROOT+"/register",
    PUT_PROFILE: API_ROOT+"/profile",
}

export default API;