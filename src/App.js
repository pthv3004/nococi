import "./App.css";
import React, { Component } from "react";
import Login from "./components/login/login";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home/home";
import Header from "./components/header/header";
import Register from "./components/register/register";
import Project from "./components/project/project";
import CreateProject from "./components/project/createProject";
import Sidebar from "./components/home/sidebar/sidebar";
import loginService from "./service/author_serivce/loginService";
import employeeService from "./service/employee_service/employeeService";
import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      name: String,
    };
  }
  componentDidMount() {
    const currentUser = loginService.getCurrentUser();
    if (currentUser) {
      employeeService
        .getEmployeeById(currentUser.employeeId)
        .then((response) => {
          this.setState({
            currentUser: currentUser,
            name: response.data.name,
          });
        });
    }
  }
  toggleSideBar = () => {
    $("#sidebar").toggleClass("active");
  };
  render() {
    return (
      <div className="App">
        <Header />
        {this.state.currentUser ? (
          <div className="wrapper">
            <Sidebar />
            <div id="content">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                  <button
                    type="button"
                    id="sidebarCollapse"
                    className="btn btn-info"
                    onClick={this.toggleSideBar}
                  >
                    <i className="fas fa-align-left"></i>
                    <span>Menu</span>
                  </button>
                </div>
              </nav>
              <BrowserRouter>
                <Switch>
                  <Route exact path={"/home"} component={Home} />
                  <Route exact path={["/", "/login"]} component={Login} />
                  <Route path={"/register"} component={Register} />
                  <Route path={"/project"} component={Project} />
                  <Route path={"/create-project"} component={CreateProject} />
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
        ) : (
          <BrowserRouter>
            <Switch>
              <Route exact path={"/home"} component={Home} />
              <Route exact path={["/", "/login"]} component={Login} />
              <Route path={"/register"} component={Register} />
              <Route path={"/project"} component={Project} />
              <Route path={"/create-project"} component={CreateProject} />
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
        )}
      </div>
    );
  }
}

export default App;
