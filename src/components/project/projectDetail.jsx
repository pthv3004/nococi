import React from 'react'
import loginService from '../../service/author_serivce/loginService';
import employeeService from '../../service/employee_service/employeeService';
import projectService from '../../service/project_service/projectService';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import CreateSprintModal from './sprint/create-sprint-modal';
import sprintService from '../../service/project_service/sprint_service/sprintService';
import './sprint/sprint.css'

class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employee: {},
            user: {},
            projectId: this.props.match.params.projectId,
            project: {},
            isOpenModal: false,
            sprints: []
        }
    }

    componentDidMount() {
        const user = loginService.getCurrentUser();
        if (user !== null) {
            employeeService.getEmployeeById(user.employeeId).then((res) => {
                this.setState({
                    employee: res.data,
                    user: user
                });
            });
            projectService.getProjectById(this.state.projectId).then((res) => {
                console.log(res.data);
                this.setState({
                    project: res.data
                })
                sprintService.getAllSprint(this.state.projectId).then((response) => {
                    console.log(response.data);
                    this.setState({
                        sprints: response.data
                    })
                })
            });

        } else {
            this.props.history.push('/');
            window.location.reload();
        }

    }


    componentWillUnmount() {

    }
    openCreateSprintModal = () => {
        this.setState({
            isOpenModal: true
        })
    }
    handleCancel = () => {
        this.setState({
            isOpenModal: false
        })
    };

    render() {
        const project = this.state.project;
        return (
            <>
                <div className='container'>
                    <div className='row px-5'>
                        <h1>{project.name} Project</h1>
                    </div>
                    <div className='content row'>
                        <Button
                            type="dashed"
                            shape="round"
                            onClick={this.openCreateSprintModal}
                            icon={<PlusCircleOutlined />}>
                            Sprint
                        </Button>
                    </div>
                    {this.state.sprints.map(sprint => (
                        <div key={sprint.id} className='row justify-content-md-center'>
                            <div className='col-9 sprint'>
                                <span className='float-left'> {sprint.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <CreateSprintModal
                    isOpenModal={this.state.isOpenModal}
                    onHide={this.handleCancel}
                    projectId={this.state.projectId} />
            </>
        )
    }
}

export default ProjectDetail;