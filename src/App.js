import "./App.css";
import React, { Component } from "react";
import Login from "./components/login/login";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home/home";
import Header from "./components/header/header";
import Register from "./components/register/register";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container mt-3">
          <BrowserRouter>
            <Switch>
              <Route exact path={"/home"} component={Home} />
              <Route exact path={["/", "/login"]} component={Login} />
              <Route path={"/register"} component={Register} />
              {/*<Route exact path="/profile" component={Profile} />
              <Route path="/user" component={UserManagement} />
              <Route path="/admin" component={AdminBoard} />
              <Route path="/faq" component={FAQManagement} />
              <Route path="/addNewFAQ" component={AddNewFAQ} />
              <Route path="/feedback" component={FeedBackManagement} />
              <Route path="/changePassword" component={ChangePassword} />
              <Route path="/order" component={OrderManagement} />
              <Route path="/view-order/:id" component={OrderDetail} />
              <Route path="/product" component={ProductManagement} />
              <Route path="/view-product/:id" component={ProductDetail} />
              <Route path="/create-product" component={CreateProduct} />
              <Route path="/staff" component={StaffPage} />
              <Route path="/product-detail/:id" component={ProductOrder} />
              <Route path="/product-feedback/:id" component={ProductFeedback} />
              <Route path="/faq-view" component={FaqView} />
              <Route path="/user-order" component={UserOrder} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} /> */}
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
