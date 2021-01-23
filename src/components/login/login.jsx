/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import loginService from '../../service/author_serivce/loginService'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gitHubUri: String,
            email: String,
            password: String
        }

        this.handleEvent = this.handleEvent.bind(this)
    }

    componentDidMount() {
       
    }

    componentDidUpdate(prevProps, prevState, snapshot) { if (prevState.name !== this.state.name) { this.handler() } }

    componentWillUnmount() {

    }

    // Prototype methods, Bind in Constructor (ES2015)
    handleEvent() { }

    // Class Properties (Stage 3 Proposal)
    handler = () => { this.setState() }
    loginWithGithub = () => {
        let url = this.gitHubUri
        this.props.history.push(url);
    }
    onChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    login = (event) => {
        event.preventDefault();
     
        let loginRequest = {
            email: this.state.email,
            password: this.state.password
        }
        loginService.login(loginRequest).then(() => {
            this.props.history.push('/home');
            window.location.reload();
        })
    }
    render() {
        const url = this.state.gitHubUri;
        return (
            <div className="container">
                <div className="card">
                    <article className="card-body">
                        <a href="/register" className="float-right btn btn-outline-primary">Sign up</a>
                        <h4 className="card-title mb-4 mt-1">Sign in</h4>
                        <p>
                            <a href={'' + url} className="btn btn-block btn-outline-primary"> Login via Github</a>
                        </p>
                        <hr />
                        <Form onSubmit={this.login}>
                            <div className="form-group">
                                <Input name="email" className="form-control" placeholder="Email or login" type="email" onChange={this.onChangeEmail} value={this.state.email} />
                            </div>
                            <div className="form-group">
                                <Input className="form-control" placeholder="******" type="password" onChange={this.onChangePassword} value={this.state.password} />
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-block" > Login  </button>
                                    </div>
                                </div>
                                <div className="col-md-6 text-right">
                                    <a className="small" href="#">Forgot password?</a>
                                </div>
                            </div>
                        </Form>
                    </article>
                </div>
            </div>
        )
    }
}
