import React, { Component } from 'react';
import loginService from '../../service/author_serivce/loginService';
import employeeService from '../../service/employee_service/employeeService';
import { PlusCircleOutlined } from '@ant-design/icons';
import projectService from '../../service/project_service/projectService';
import moment from 'moment';
import "antd/dist/antd.css";
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './project_table.css';

class Project extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            employee: {},
            projects: [],
            searchText: '',
            searchedColumn: '',
        }
    }

    componentDidMount() {
        const user = loginService.getCurrentUser();
        if (user) {
            employeeService.getEmployeeById(user.employeeId).then((res) => {
                this.setState({
                    employee: res.data,
                    user: user
                });
            });
            projectService.getAllProject().then((response) => {
                if (response.data.length) {
                    let projects = [];
                    response.data.map(project => {
                        project.startDate = moment(project.startDate).format("DD-MM-YYYY")
                        project.endDate = moment(project.endDate).format("DD-MM-YYYY")
                        projects.push(project)
                        return projects;
                    });
                    this.setState({
                        projects: projects
                    })
                }
            })
        } else {
            this.props.history.push('/');
            window.location.reload();
        }
    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
              </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
              </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
              </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (text) : (text),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    onRowClick=(event)=>{
        this.props.history.push('/project-detail/'+event);
    }
    componentWillUnmount() {
    }
    render() {
        const tableData = this.state.projects;
        const columns = [
            {
                title: 'Project Name',
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'Member',
                dataIndex: 'noOfMember',
                key: 'noOfMember',
            },
            {
                title: 'Project Type',
                dataIndex: 'projectType',
                key: 'projectType',
                render: projectType => (
                    <>
                        {projectType.name}
                    </>
                ),
            },
            {
                title: 'Start Date',
                dataIndex: 'startDate',
                key: 'startDate',
            },
            {
                title: 'End Date',
                dataIndex: 'endDate',
                key: 'endDate',
            },
        ]
        return (
            <div className="container">
                <div className='row px-5'>
                    <Button
                        type="dashed"
                        shape="round"
                        href="/create-project"
                        icon={<PlusCircleOutlined />}>
                    </Button>
                    <h6 className='mt-2'>Projects</h6>
                    <div className='col'>do something</div>
                </div>
                <div className="content mt-5">
                    <Table className='thead-dark' columns={columns} dataSource={tableData} 
                      onRow={(record, rowIndex) => {
                        return {
                          onClick: event => {this.onRowClick(record.id)}, // click row
                        };
                      }}
                    />
                </div>
            </div>
        );
    }
}

export default Project;
