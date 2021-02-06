import React, { Component } from 'react'
import loginService from '../../service/author_serivce/loginService'
import Form from 'react-validation/build/form'
import Sidebar from './sidebar/sidebar'
import './sidebar/sidebarHome';
import employeeService from '../../service/employee_service/employeeService';

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            employee: {}
        }

        this.handleEvent = this.handleEvent.bind(this)
    }

    componentDidMount() {
        const user = loginService.getCurrentUser();
        if (user) {
            employeeService.getEmployeeById(user.employeeId).then((res)=>{
                this.setState({
                    employee: res.data,
                    user: user
                })
            })
            
        } else {
            this.props.history.push('/');
            window.location.reload();
        }


    }

    componentDidUpdate(prevProps, prevState, snapshot) { if (prevState.name !== this.state.name) { this.handler() } }

    componentWillUnmount() {

    }

    // Prototype methods, Bind in Constructor (ES2015)
    handleEvent() { }

    // Class Properties (Stage 3 Proposal)
    handler = () => { this.setState() }
    logout = (event) => {
        event.preventDefault();
        loginService.logout().then(() => {
            localStorage.removeItem('user');
            this.props.history.push('/');
            window.location.reload();
        },(error)=>{
            console.log(error.response.statusText);
            alert(error.response.statusText)
        });
    }

    render() {
        const username = this.state.employee.name
        return (
            <div>
                <div className="wrapper">
                    <Sidebar />
                    <div id="content">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid">
                                <button type="button" id="sidebarCollapse" className="btn btn-info">
                                    <i className="fas fa-align-left"></i>
                                    <span>Menu</span>
                                </button>

                            </div>
                        </nav>
                        <h1> Hello {username}</h1>
                        <Form onSubmit={this.logout}>
                            <button type="submit">Logout</button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
