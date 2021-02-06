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
        this.setState({
          currentUser: currentUser,
          name: response.data.name
        })
      })
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
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <span className="navbar-brand">
            <a href="/home" className="nav-link">
              Nococid
            </a>
          </span>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <p>{name}</p>
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
