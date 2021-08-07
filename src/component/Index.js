import SideBar from "./layout/SideBar";
import HeaderBar from "./layout/HeaderBar";
import SectionDiscount from "./layout/section/SectionDiscount";
import SectionWelcome from "./layout/section/SectionWelcome";
import SectionCategory from "./layout/section/SectionCategory";
import SectionArrivals from "./layout/section/SectionArrivals";
import SectionOfferAria from "./layout/section/SectionOfferArea";
import SectionTestimonial from "./layout/section/SectionTestimonial";
import FooterBar from "./layout/FooterBar";

import Cart from "./Cart";
import Checkout from "./Checkout";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";

import { BrowserRouter, Switch, Route } from "react-router-dom";
function Index() {
    return (
        <div>
            {/* <SideBar></SideBar> */}
            <HeaderBar></HeaderBar>
            <SectionDiscount></SectionDiscount>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        {/* <SectionWelcome></SectionWelcome> */}
                        <SectionCategory></SectionCategory>
                        <SectionArrivals></SectionArrivals>
                        <SectionOfferAria></SectionOfferAria>
                        {/* <SectionTestimonial></SectionTestimonial> */}
                    </Route>
                    <Route exact path="/login">
                        <Login></Login>
                    </Route>
                    <Route exact path="/register">
                        <Register></Register>
                    </Route>
                    <Route exact path="/profile">
                        <Profile></Profile>
                    </Route>
                    <Route exact path="/cart/checkout">
                        <Checkout></Checkout>
                    </Route>
                    <Route exact path="/cart">
                        <Cart></Cart>
                    </Route>
                </Switch>
            </BrowserRouter>
            <FooterBar></FooterBar>
        </div>
    );
}

export default Index;