import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { projectActions } from '../../_actions/projects.action';

class InitPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      robot_type:'',
      errorMessage: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.setState({robot_type: event.value},
      () => {
        const { dispatch, project } = this.props;
        const data = {
          robot_type : this.state.robot_type,
          status: 'init'
        }
        dispatch(projectActions.updateProject(project.id, data, false))
      });
    
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, project } = this.props;
    const data = {
      robot_type : this.state.robot_type,
      status: 'upload'
    }
    dispatch(projectActions.updateProject(project.id, data, 'upload', 'Robot type selected'))
  }

  render() {
    const robotTypes = [
      { label: "UR5", value: 'UR5' },
      { label: "UR10", value: 'UR10' },
      { label: "UR3e", value: 'UR3e' },
      { label: "UR5e", value: 'UR5e' },
      { label: "UR10e", value: 'UR10e' },
    ];
    const { project } = this.props;

    return (
      <div className="container" style={{ marginTop: 50 }}>
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="row ">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <form name="form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="robot_type">Please choose robot type:</label>
                    <Select options={robotTypes} selected={this.state.robot_type} name='robot_type' onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary">Next</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { project } = state.project;
  return {
      project
  };
}

const connectedInitPage = connect(mapStateToProps)(InitPage);
export { connectedInitPage as InitPage }; 
