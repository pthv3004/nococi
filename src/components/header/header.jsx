/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import loginService from '../../service/author_serivce/loginService'
import employeeService from '../../service/employee_service/employeeService'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: undefined,
      name: ''
    }
  }

  componentDidMount() {
    const currentUser = loginService.getCurrentUser();
    if (currentUser) {
      employeeService.getEmployeeById(currentUser.employeeId).then((response) => {
      console.log(response.data);
        this.setState({
          currentUser: currentUser,
          name: response.data.name
        })
      })
      console.log(currentUser);
    }

  } 


  componentWillUnmount() {

  }

  
  logout = () => {
    loginService.logout().then(() => {
      window.location.reload();
      localStorage.removeItem('user');

    });
  }

  render() {
    const { currentUser, name } = this.state
    return (
      <div className="container">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <span className="navbar-brand">Nococid</span>
          {/* <div className="navbar-nav mr-auto">
            {role === "ROLE_ADMIN" && (
              <li className="nav-item ml-3">
                <Link to={"/admin"} className="nav-link">
                  <img src={IconAdmin} width="30" height="30" alt="" />
                      Admin Board
                    </Link>
              </li>
            )}
            {role === "ROLE_STAFF" && (
              <li className="nav-item">
                <Link to={"/staff"} className="nav-link ml-3">
                  <img src={IconStaff} width="30" height="30" alt="" />
                      Staff Board
                    </Link>
              </li>
            )}
            {currentUser && role !== "ROLE_ADMIN" && (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link ml-2">
                    <img src={IconHome} width="30" height="30" alt="" />
                        Home Page
                      </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/user-order"} className="nav-link ml-2">
                    <img src={IconCart} width="30" height="30" alt="" />
                        Order
                      </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/faq-view"} className="nav-link ml-2">
                    FAQ
                      </Link>
                </li>
              </div>
            )}
          </div> */}

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/profile" className="nav-link">
                  <p>{name}</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={this.logout}>
                  Sign Out
                      </a>
              </li>
            </div>
          ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="/login" className="nav-link">
                    Login
                    </a>
                </li>

                <li className="nav-item">
                  <a href="/register" className="nav-link">
                    Sign Up
                    </a>
                </li>
              </div>
            )}
        </nav>
      </div>
    )
  }
}
