import React, { Component } from 'react'
import loginService from '../../service/author_serivce/loginService'
import Form from 'react-validation/build/form'
import './sidebar/sidebarHome';
import employeeService from '../../service/employee_service/employeeService';
import ThirdPartiesService from '../../service/third_parties_service/thirdPartiesService'
import githubRepoService from '../../service/githubrepository_service/githubRepoService';


export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            employee: {},
            gitHubLoginURI: "",
            successMessage: "",
            errMessage: "",
        }

    }

    componentDidMount() {
        const user = loginService.getCurrentUser();
        if (user) {
            employeeService.getEmployeeById(user.employeeId).then((res) => {
                this.setState({
                    employee: res.data,
                    user: user
                })
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
        let id = params.get('thirdPartyId');
        let username = params.get('username');
        let state = params.get('state');
        
        if (id && username && state) {
            params = {
                id: id,
                state: state,
                username: username
            }
            this.connectWithGitHub(params);
        }
    }

    connectWithGitHub = (params) => {
        ThirdPartiesService.connectWithGitHub(params).then(() => {
            this.setState({
                successMessage: "You have already connect with git hub"
            });
            githubRepoService.refreshRepository(params.id).then((response)=>{
                console.log(response.data);
            },(error)=>{
                console.log(error.response.data);
            })
        }, (error) => {
            this.setState({
                errMessage : error.response.data.detail.message
            })
        });
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
        }, (error) => {
            console.log(error.response.statusText);
            alert(error.response.statusText)
        });
    }

    render() {
        const username = this.state.employee.name
        return (
            <div>
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
                <p>{this.state.errMessage}</p>
            </div>

        )
    }
}
