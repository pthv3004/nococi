import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import './sidebar.css'
import loginService from '../../../service/author_serivce/loginService';
import employeeService from '../../../service/employee_service/employeeService';
import thirdPartyAccountService from '../../../service/third_parties_service/thirdPartyAccountService';


class Sidebar extends Component {
    constructor(props) {

        super(props)
        this.state = {
            user: {},
            employee: {},
            thirdPartyAccounts: [],
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
            thirdPartyAccountService.getThirdPartyAccount().then((res) => {
                this.setState({
                    thirdPartyAccounts: res.data
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
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>NocoCID</h3>
                </div>

                <ul className="list-unstyled components">
                    <p>Home Page</p>
                    <li className="active">
                        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Overview</a>
                        <ul className="collapse list-unstyled" id="homeSubmenu">
                            <li>
                                <a href="#">Summary</a>
                            </li>
                            <li>
                                <a href="#">Dashboards</a>
                            </li>
                            <li>
                                <a href="#">Wiki</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">Boards</a>
                    </li>
                    <li>
                        <a href="/project">Projects</a>
                    </li>
                    <li>
                        <a href="#">Pipelines</a>
                    </li>
                    <li>
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Test Plans</a>
                        <ul className="collapse list-unstyled" id="pageSubmenu">
                            <li>
                                <a href="#">Page 1</a>
                            </li>
                            <li>
                                <a href="#">Page 2</a>
                            </li>
                            <li>
                                <a href="#">Page 3</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#accountsSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">ThirdPartyAccounts</a>
                        <ul className="collapse list-unstyled" id="accountsSubmenu">
                            {this.state.thirdPartyAccounts.map(thirdPartyAccount => (
                                <li key={thirdPartyAccount.id}>
                                    <a href={"/repository/" + thirdPartyAccount.id}><img src={thirdPartyAccount.avatar_url} alt="this is avartar" className="avatar"/>
                                    {thirdPartyAccount.email}</a>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Sidebar;