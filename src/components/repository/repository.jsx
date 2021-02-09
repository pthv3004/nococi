import React, { Component } from 'react'
import loginService from '../../service/author_serivce/loginService';
import employeeService from '../../service/employee_service/employeeService';
import thirdPartyAccountService from '../../service/third_parties_service/thirdPartyAccountService';

export default class Repository extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            employee: {},
            thirdPartyId: this.props.match.params.thirdPartyId,
            organizations: []
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
            thirdPartyAccountService.getCollaboratorsRepository(this.state.thirdPartyId).then((res) => {
                this.setState({
                    organizations: res.data,
                })
            })
        } else {
            this.props.history.push('/');
            window.location.reload();
        }
    }


    componentWillUnmount() {

    }

    render() {
        let owner = this.state.organizations.map(organization => (
            organization.isOwner === true ?
                organization.repositoties.map(repository => (
                    <li key={repository.repoId} class="list-group-item list-group-item-success">Repository Name: {repository.name}
                    <button className="btn btn-primary float-right">{repository.isFollowed === false ? "Follow":"UnFollow"}</button></li>
                )) : ("")))
        let notOwner = this.state.organizations.map(organization => (
            organization.isOwner === false ?
                organization.repositoties.map(repository => (
                    <li key={repository.repoId} class="list-group-item list-group-item-danger">Repository Name: {repository.name}
                    <button className="btn btn-secondary float-right">{repository.isFollowed === false ? "Follow":"UnFollow"}</button></li>
                )) : ("")))
        return (
            <div className="container col-12 col-md-10">
                <div class="card text-left">
                    <div class="card-header">
                        <h1>Organizations</h1>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Owner</h5>
                        <ul class="list-group">
                            {owner}
                        </ul>
                        <h5 class="card-title">Not Owner</h5>
                        <ul class="list-group">
                            {notOwner}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
