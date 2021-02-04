import { projectsConstants, projectConstants, filesConstants } from '../_constants';
import { projectService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';


export const projectActions = {
    getProjectById,
    getProjectsByUserId,
    deleteProject,
    newProject,
    updateProject,
    getFilesByProjectId,
    downloadFile,
    startPayment,
    downloadInvoice
};


function downloadInvoice(id){
    return dispatch => {
        projectService.downloadInvoice(id).then(
            res => {
                if(res.data.error == true){
                    dispatch(alertActions.error(res.data.message));
                }else{
                    window.location.href = res.data.downloadUrl;
                }


            },
            error => {
                console.log(error.toString);
            }
        );
    }
}



function startPayment(projectId, redirectUrl){
    return dispatch => {projectService.startPayment(projectId, redirectUrl).then(
        res => {
            if(res.data.error == true){
                dispatch(alertActions.error(res.data.message));    
            }else{
                window.location.href = res.data.gatewayUrl;
            }
            
        },
        error => {
            dispatch(alertActions.error(error.toString()));
        }
    )
    }
   
}

function downloadFile(fileName){
     return  projectService.downloadFile(fileName);
    
}


function getFilesByProjectId(projectId){
    return dispatch => {
        dispatch(request());
        projectService.getFilesByProjectId(projectId)
            .then(
                res => {
                    if(res.data.error){
                        dispatch(alertActions.error(res.data.message.toString()))
                    }else{
                        console.log(res.data);
                       dispatch(success(res.data.files ));
                    } 
                },
                error => {
                    console.log(error.toString);
                }
            );
    };
    function success(files) { return { type: filesConstants.GET_FILES, files } }
    function request() { return { type: filesConstants.GET_FILES_REQUEST } }
}

function getProjectById(id){
    return dispatch => {
        dispatch(request());
        projectService.getProjectsById(id)
            .then(
                res => {
                    if(res.data.error){
                        dispatch(failure());
                        dispatch(alertActions.error(res.data.message.toString()))
                    }else{
                        console.log(res.data);
                       dispatch(success(res.data.project ));
                    } 
                },
                error => {
                    console.log(error.toString);
                }
            );
    };
    function success(project) { return { type: projectConstants.GET_PROJECT, project } }
    function request() { return { type: projectConstants.GET_PROJECT_REQUEST } }
}

function updateProject(id,data,page, message) {
    return dispatch => {
        dispatch(request);
        projectService.updateProject(id,data)
            .then(
                res => {
                    if(!res.data.error){
                        if(page){
                            history.push('/projects/'+res.data.project.id+'/' + page);
                            dispatch(alertActions.success(message));
                        }
                        dispatch(success(res.data.project))
                    }
                },
                error => {console.log(error.toString)}
            )
    };
    function request() { return { type: projectConstants.UPDATE_PROJECT_REQUEST } }
    function success(project) { return { type: projectConstants.UPLOAD_PROJECT, project } }
}

function newProject() {
    return dispatch => {
        dispatch(request)
        projectService.newProject()
            .then(
                res => {
                    if(!res.data.error){
                        console.log(res.data.project);
                        history.push('/projects/'+res.data.project.id+'/init');
                        dispatch(success(res.data.project))
                        dispatch(alertActions.success('New project initiated'));
                    }
                },
                error => {console.log(error.toString)}
            )
    };
    function request() { return { type: projectConstants.UPDATE_PROJECT_REQUEST } }
    function success(project) { return { type: projectConstants.INIT_PROJECT, project } }
}

function getProjectsByUserId(userId){
    return dispatch => {
        dispatch(request());
        projectService.getProjectsByUserid(userId)
            .then(
                res => {
                    if(res.data.error){
                        dispatch(failure());
                        dispatch(alertActions.error(res.data.message.toString()))
                    }else{
                       dispatch(success(res.data.projects ));
                    } 
                },
                error => {
                    failure();
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request() { return { type: projectsConstants.PROJECT_PAGE_LOADING } }
    function success(projects) { return { type: projectsConstants.PROJECT_PAGE_LOADED, projects } }
    function failure() { return { type: projectsConstants.PROJECT_PAGE_FAILED } }
}

function deleteProject(id) {
    return dispatch => {
        projectService.deleteProjectById(id)
            .then(
                res => {
                    if(!res.data.error){
                        dispatch(success(id))
                    }
                },
                error => {console.log(error.toString)}
            )
    };

    function success(id) { return { type: projectsConstants.PROJECT_DELETE, id } }
}