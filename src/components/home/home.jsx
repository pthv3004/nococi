import React, { Component } from 'react'
import loginService from '../../service/author_serivce/loginService'
import Form from 'react-validation/build/form'
import Sidebar from './sidebar/sidebar'
import './sidebar/sidebarHome'
import ThirdPartiesService from '../../service/third_parties_service/thirdPartiesService'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            gitHubLoginURI: "",
            successMessage: "",

        }

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
        const uri = ThirdPartiesService.getGitHubLoginURI();
        this.setState({
            gitHubLoginURI: uri
        })
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let message = params.get('JwtToken');
        if (message) {
            this.setState({
                successMessage: "You have already connected with Github"
            })
        }


    }


    componentWillUnmount() {

    }

    // Prototype methods, Bind in Constructor (ES2015)

    // Class Properties (Stage 3 Proposal)
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
                        <hr />
                        {this.state.successMessage.length > 0 ? (
                            <h1>{this.state.successMessage}</h1>
                        ) : (
                                <a href={this.state.gitHubLoginURI}>Connect with Github</a>
                            )}
                        <Form onSubmit={this.logout}>
                            <button type="submit">Logout</button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
