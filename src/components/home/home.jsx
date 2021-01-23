import React, { Component } from 'react'
import loginService from '../../service/author_serivce/loginService'
import Form from 'react-validation/build/form'
import Sidebar from './sidebar/sidebar'
import './sidebar/sidebarHome'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {}
        }

        this.handleEvent = this.handleEvent.bind(this)
    }

    componentDidMount() {
        const user = loginService.getCurrentUser();
        if (user) {
            this.setState({
                user: user
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
        });
    }

    render() {
        const username = this.state.user.jwtToken
        return (
            <div className="container-fluid">
                <div class="wrapper">
                    <Sidebar />
                    <div id="content">
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            <div class="container-fluid">
                                <button type="button" id="sidebarCollapse" class="btn btn-info">
                                    <i class="fas fa-align-left"></i>
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
