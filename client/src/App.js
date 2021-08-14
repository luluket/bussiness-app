import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

import MenuScreen from "./screens/MenuScreen";
import PartnerListScreen from "./screens/PartnerListScreen";
import PartnerScreen from "./screens/PartnerScreen";
import PartnerCreateScreen from "./screens/PartnerCreateScreen";
import ArticleListScreen from "./screens/ArticleListScreen";
import ArticleScreen from "./screens/ArticleScreen";
import ArticleCreateScreen from "./screens/ArticleCreateScreen";
import CentralScreen from "./screens/CentralScreen";
import CentralReceiptCreateScreen from "./screens/CentralReceiptCreateScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/menu" component={MenuScreen} />
            <Route exact path="/articles" component={ArticleListScreen} />
            <Route path="/article/:id" component={ArticleScreen} />
            <Route path="/articles/create" component={ArticleCreateScreen} />
            <Route path="/partners" component={PartnerListScreen} exact />
            <Route path="/partner/:id" component={PartnerScreen} />
            <Route
              exact
              path="/partners/create"
              component={PartnerCreateScreen}
            />
            <Route path="/central" component={CentralScreen} exact />
            <Route
              path="/central/receipt"
              component={CentralReceiptCreateScreen}
              exact
            />

            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/admin/userlist" component={UserListScreen} exact />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route
              path="/admin/productlist"
              component={ProductListScreen}
              exact
            />
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductListScreen}
              exact
            />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route path="/" component={HomeScreen} exact />
            <Route path="/page/:pageNumber" component={HomeScreen} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
              exact
            />
            <Route path="/search/:keyword" component={HomeScreen} exact />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
