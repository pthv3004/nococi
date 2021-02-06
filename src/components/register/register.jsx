import React, { Component } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import loginService from '../../service/author_serivce/loginService';

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            success: false,
            message: "",
            loading: false,
            email: "",
            confirmPassword:""
        }

    }
    required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required.
                </div>
            );
        }
    };

    validateUsername = (value) => {
        if (value.length < 3 || value.length > 15) {
            return (
                <div className="alert alert-danger" role="alert">
                    The username must be between 3 and 20 characters.
                </div>
            );
        }
    };
    validateEmail = (value) => {
        if (value.length < 3 || value.length > 15) {
            return (
                <div className="alert alert-danger" role="alert">
                    The Email must be between 3 and 20 characters.
                </div>
            );
        // eslint-disable-next-line no-useless-escape
        }if (!value.match("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")) {
            return (
                <div className="alert alert-danger" role="alert">
                    The email is invalid.
                </div>
            );
        }
    };
    validatePassword = (value) => {
        if (value.length < 6 || value.length > 20) {
            return (
                <div className="alert alert-danger" role="alert">
                    The password must be between 6 and 20 characters.
                </div>
            );
        }
    };
    validateConfirmPassword = (value) => {
        if (value.length < 6 || value.length > 20) {
            return (
                <div className="alert alert-danger" role="alert">
                    The Confirm password must be between 6 and 20 characters.
                </div>
            );
        }if(value !== this.state.password){
            return (
                <div className="alert alert-danger" role="alert">
                    The Confirm password must match password.
                </div>
            );
        }
    };
    componentDidMount() {

    }

    
    onchangePassword=(event)=> {
        this.setState({
            password: event.target.value,
        });
    }
    onchangeConfirmPassword=(event)=> {
        this.setState({
            confirmPassword: event.target.value,
        });
    }
    onChangedUsername=(event) =>{
        this.setState({
            username: event.target.value,
        });
    }
    onChangedEmail=(event) =>{
        this.setState({
            email: event.target.value,
        });
    }
    handleRegister = (event) => {
        event.preventDefault();
        this.setState({
            message: "",
            success: false,
            loading: true,
        });
        if (this.checkBtn.context._errors.length === 0) {
            let signUpRequest = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            };
            loginService.register(signUpRequest).then(
                (response) => {
                    this.props.history.push("/login");
                },
                (error) => {
                    const responseMessage = error.response.data;

                    this.setState({
                        loading: false,
                        success: false,
                        message: responseMessage,
                    });
                }
            );
        } else {
            this.setState({
                loading: false,
            });
        }
    }

    componentWillUnmount() {

    }


    render() {
        return (
            <div className="container col-md-5">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Form
                        onSubmit={this.handleRegister}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                 <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangedEmail}
                                        validations={[this.required, this.validateEmail]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangedUsername}
                                        validations={[this.required, this.validateUsername]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onchangePassword}
                                        validations={[this.required, this.validatePassword]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ConfirmPassword">ConfirmPassword</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="ConfirmPassword"
                                        value={this.state.ConfirmPassword}
                                        onChange={this.onchangeConfirmPassword}
                                        validations={[this.required, this.validateConfirmPassword]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button
                                        className="btn btn-primary btn-block"
                                        disabled={this.state.loading}
                                    >
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Sign Up</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={(c) => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        )
    }
}
