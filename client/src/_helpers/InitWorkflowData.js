import React from 'react';
import { connect } from 'react-redux';
import { projectActions } from '../_actions/projects.action';


export default function(ComposedComponent) {
  class InitWorkflowData extends React.Component {

    componentDidMount = () => {
      let  id  = this.props.match.params.id
      const { dispatch } = this.props;
      dispatch(projectActions.getProjectById(id));
    } 
  

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  function mapStateToProps(state) {
    return {
    };
  }

  return connect(mapStateToProps)(InitWorkflowData);
}