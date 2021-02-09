import React from 'react'
import { Button, Modal } from 'antd'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import repositoryService from '../../../service/repository_service/repositoryService';
import sprintService from '../../../service/project_service/sprint_service/sprintService';
import CheckButton from "react-validation/build/button";
class CreateSprintModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: this.props.isOpenModal,
            loading: false,
            repositories: [],
            repositoryId: "",
            projectId: this.props.projectId,
            sprintName: "",
            startDate: "",
            endDate: "",
            message: ""
        }

    }

    componentDidMount() {
        repositoryService.getAllRepositories().then((res) => {
            this.setState({
                repositories: res.data
            })
        })
    }


    componentWillUnmount() {

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

    onChangeSprintName = (event) => {
        this.setState({
            sprintName: event.target.value,
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

    onChangeRepositoryId = (event) => {
        this.setState({
            repositoryId: event.target.value,
        });
        console.log(event.target.value)
    }

    handleCreateSprint = (event) => {

        event.preventDefault();
        this.setState({
            loading: true
        })
        if (this.checkBtn.context._errors.length === 0) {
            let sprintRequest = {
                name: this.state.sprintName,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                repositoryId: this.state.repositoryId
            };
            sprintService.createSprint(this.state.projectId, sprintRequest).then(
                (response) => {
                    console.log(response)
                    this.setState({
                        loading: false
                    })
                    this.props.onHide();
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
        } else {
            this.setState({
                loading: false
            })
        }
    }

    render() {
        return (
            <>
                <Modal
                    visible={this.props.isOpenModal}
                    title="Create Sprint"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.props.onHide}>
                            Return
                         </Button>

                    ]}
                >
                    <Form
                        onSubmit={this.handleCreateSprint}
                        ref={(c) => {
                            this.form = c;
                        }}>
                        <div className="form-group">
                            <label htmlFor="projectName">Sprint name: </label>
                            <Input
                                type="text"
                                className="form-control"
                                name="projectName"
                                value={this.state.sprintName}
                                onChange={this.onChangeSprintName}
                                validations={[this.required]} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="startDate">Start date:</label>
                            <Input
                                type="datetime-local"
                                name="startDate"
                                step="1"
                                onChange={this.onChangStartDate} 
                                validations={[this.required]}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="startDate">End date:</label>
                            <Input
                                type="datetime-local"
                                name="endDate"
                                step="1"
                                onChange={this.onChangEndDate}
                                validations={[this.required]} />
                        </div>
                        <div className="form-group">
                            <label>Repository:
                            <select value={this.state.repositoryId} onChange={this.onChangeRepositoryId}>
                                    <option>Select Repository </option>
                                    {this.state.repositories.map(element => (
                                        <option key={element.id} value={element.id} >{element.name}</option>
                                    ))
                                    }
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>CreateSprint</span>
                            </button>
                        </div>

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
                </Modal>
            </>
        )
    }
}

export default CreateSprintModal;