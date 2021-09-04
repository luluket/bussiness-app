import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MenuScreen from "./screens/MenuScreen";
import UserScreen from "./screens/UserScreen";
import PartnerListScreen from "./screens/PartnerListScreen";
import PartnerScreen from "./screens/PartnerScreen";
import PartnerCreateScreen from "./screens/PartnerCreateScreen";
import ArticleListScreen from "./screens/ArticleListScreen";
import ArticleScreen from "./screens/ArticleScreen";
import ArticleCreateScreen from "./screens/ArticleCreateScreen";
import CentralScreen from "./screens/CentralScreen";
import CentralReceiptCreateScreen from "./screens/CentralReceiptCreateScreen";
import CentralExportCreateScreen from "./screens/CentralExportCreateScreen";
import ManufactureScreen from "./screens/ManufactureScreen";
import RateOfYieldCreateScreen from "./screens/RateOfYieldCreateScreen";
import RequisitionCreateScreen from "./screens/RequisitionCreateScreen";
import WorkorderCreateScreen from "./screens/WorkorderCreateScreen";
import WorkorderScreen from "./screens/WorkorderScreen";
import ProductExportCreateScreen from "./screens/ProductExportCreateScreen";
import SaleReceiptCreateScreen from "./screens/SaleReceiptCreateScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/" component={MenuScreen} exact />
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
            <Route
              path="/central/export"
              component={CentralExportCreateScreen}
              exact
            />
            <Route path="/manufacture" component={ManufactureScreen} exact />
            <Route
              path="/manufacture/rate"
              component={RateOfYieldCreateScreen}
              exact
            />
            <Route
              path="/manufacture/requisition"
              component={RequisitionCreateScreen}
              exact
            />
            <Route
              path="/manufacture/workorder/create"
              component={WorkorderCreateScreen}
              exact
            />
            <Route
              path="/manufacture/workorder/:id"
              component={WorkorderScreen}
              exact
            />
            <Route
              path="/manufacture/export"
              component={ProductExportCreateScreen}
              exact
            />
            <Route
              path="/central/sale/receipt/create"
              component={SaleReceiptCreateScreen}
              exact
            />
            <Route path="/user/:id" component={UserScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
