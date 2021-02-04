import { projectsConstants } from '../_constants';

const initialState = {projects:{} };

export function projects(state = initialState, action) {
  switch (action.type) {
    case projectsConstants.PROJECT_PAGE_UNLOADED:
      return {
        projects:{}
      };
    case projectsConstants.PROJECT_PAGE_LOADING:
      return {
        loading: true,
        projects:{}
      };
    case projectsConstants.PROJECT_PAGE_LOADED:
      return {
        projects: action.projects
      };
    case projectsConstants.PROJECT_DELETE:
      return {
        projects: state.projects.filter(project => project.id != action.id)
      };
    default:
      return state
  }
}