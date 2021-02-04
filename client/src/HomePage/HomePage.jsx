import React from 'react';
import { connect } from 'react-redux';
import { projectsConstants } from '../_constants';
import { projectActions } from '../_actions/projects.action';
import ProjectList from './ProjectList.jsx'

class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            projects : [{}],
            isLoading: true
        }
        this.newProject = this.newProject.bind(this);
    }

    componentDidMount = () => {
       const { dispatch, user } = this.props;
       dispatch(projectActions.getProjectsByUserId(user.id));
    }  
    
    componentWillUnmount = ()=> {
       this.props.onUnload();
    }  

    newProject(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(projectActions.newProject());   
    }

    render() {
        const {projects, loading } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                {loading? 'Loading..' : <ProjectList data = {projects}/>}
                <button className="btn btn-primary" onClick={this.newProject}>
                New Project <span className="glyphicon glyphicon-plus"></span>
                </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    const { projects, loading } = state.projects;
    return {
        user,
        projects,
        loading
    };
}

const mapDispatchToProps = dispatch => ({
    onUnload: () =>
      dispatch({ type: projectsConstants.PROJECT_PAGE_UNLOADED })
});

const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export { connectedHomePage as HomePage };