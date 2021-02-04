import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../_helpers/utils'
import { projectActions } from '../_actions'

class ProjectList extends Component {

  constructor(props) {
    super(props);
    this.deleteProject = this.deleteProject.bind(this);
  }

  deleteProject(e, projectId) {
    e.preventDefault();
    const { dispatch } = this.props;
    let confirmed = confirm("Are you sure to delete the project?");
    if(confirmed){
      dispatch(projectActions.deleteProject(projectId));
    }
  }

  render() {
    var projects = Array.from(this.props.data);
    console.log(projects);
    return (
      <div style={{ maxWidth: '100%' }}>
        <table className="table table-striped table-bordered" >
          <thead>
            <tr>
              <th>Robot Type</th>
              <th>Created Date</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              return (
                <tr key={project.id}>
                  <td>{project.robot_type}</td>
                  <td>{formatDate(project.created_date)}</td>
                  <td>{project.status}</td>
                  <td>{project.payment_status}</td>
                  <td>
                    <a href={`/projects/${project.id}/${project.status}`} title='Edit'><span className="glyphicon glyphicon-edit"> </span> </a>
                    <a href='#' onClick={e => this.deleteProject(e, project.id)} title='Delete'><span className="glyphicon glyphicon-minus"> </span></a></td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, null)(ProjectList)

