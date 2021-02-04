import React, { Component } from 'react';
import { connect } from 'react-redux';
import { projectActions } from '../../_actions/projects.action';

class ProcessingPage extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {

  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, project } = this.props;
    const data = {
      robot_type: this.state.robot_type,
      status: 'upload'
    }
    dispatch(projectActions.updateProject(project.id, data, true))
  }

  render() {

    const { project } = this.props;

    return (
      <div className="container " style={{ marginTop: 50 }}>
        <div className="panel panel-default">
          <div className="panel-body alert-success" >
            <div className="row ">
              <div className="col-md-3"></div>
              <div className="col-md-7">
                <div className="form-group">
                  <h3>Robot Calibration process has been started successfully!</h3>
                  <h3>The process might take up to several hours. You will be notified by your email address once it is done. </h3>
                  <h3>Thank you for your patience!</h3>
                </div>
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

const connectedProcessingPage = connect(mapStateToProps)(ProcessingPage);
export { connectedProcessingPage as ProcessingPage }; 
