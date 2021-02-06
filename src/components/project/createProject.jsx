import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import ProjectService from '../../service/project_service/projectService';
import ProjectTypeService from '../../service/project_service/projectTypeService';
import '../home/sidebar/sidebarHome';

class CreateProject extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projectName: "",
            startDate: "",
            endDate: "",
            projectTypeID: "",
            projectTypes: []
        }

    }

    componentDidMount() {
        ProjectTypeService.getAllProjectTypes().then((response) => {
            this.setState({
                projectTypes: response.data
            })
            console.log(this.state.projectTypes);
        })
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

    onChangeProjectName = (event) => {
        this.setState({
            projectName: event.target.value,
        });
    }

    onChangStartDate = (event) => {
        this.setState({
            startDate: event.target.value,
        });
    }

    onChangEndDate = (event) => {
        this.setState({
            endDate: event.target.value,
        });
    }

    onChangeProjectTypeID = (event) => {
        this.setState({
            projectTypeID: event.target.value,
        });
        console.log(event.target.value)
    }

    handleCreateProject = (event) => {
        event.preventDefault();
        let projectRequest = {
            Name: this.state.projectName,
            StartDate: this.state.startDate,
            EndDate: this.state.endDate,
            ProjectTypeId: this.state.projectTypeID
        };
        ProjectService.create(projectRequest).then(
            (response) => {
                console.log(response)
            },
            (error) => {
                const responseMessage = error.response.data.message;

                this.setState({
                    loading: false,
                    success: false,
                    message: responseMessage,
                });
            }
        )
    }
    render() {
        return (

            <div className="container col-md-5">
                <div className="card ">
                    <h5 className="card-header">CreateProject</h5>
                    <div className="card-body">
                        <Form
                            onSubmit={this.handleCreateProject}
                            ref={(c) => {
                                this.form = c;
                            }}>
                            <div className="form-group">
                                <label htmlFor="projectName">Project name: </label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="projectName"
                                    value={this.state.email}
                                    onChange={this.onChangeProjectName}
                                    validations={[this.required]} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="startDate">Start date:</label>
                                <Input
                                    type="datetime-local"
                                    name="startDate"
                                    step="1"
                                    onChange={this.onChangStartDate} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="startDate">End date:</label>
                                <Input
                                    type="datetime-local"
                                    name="endDate"
                                    step="1"
                                    onChange={this.onChangEndDate} />
                            </div>
                            <div className="form-group">
                                <label>Project Type:
                            <select value={this.state.projectTypeID} onChange={this.onChangeProjectTypeID}>
                                        <option>Select project type</option>
                                        {this.state.projectTypes.map(element => (
                                            <option value={element.id} >{element.name}</option>
                                        ))
                                        }
                                    </select>
                                </label>
                            </div>
                            <button
                                className="btn btn-primary btn-block"
                            >
                                <span>Create project</span>
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateProject;