import React, { Component } from 'react';
import { connect } from 'react-redux';
import { projectActions } from '../../_actions/projects.action';
import ShowFiles from './showFiles';
import config from 'config';
import StartPayment from './startPayment';



class ProcessedPage extends Component {

	componentDidMount = () => {
		setTimeout(
			function () {
				const { dispatch, loading, project } = this.props;
				if (loading != true && project && project.id) {
					dispatch(projectActions.getFilesByProjectId(project.id));
				}
			}.bind(this), 300);

	}
	downloadFile = (fileId) => {
		window.location.href = `${config.apiUrl}/files/download/${fileId}`

	}

	startPayment = () => {
		console.log("started payment")
		const { dispatch, project }  = this.props;
		const redurectUrl = window.location.href;
		dispatch(projectActions.startPayment(project.id, redurectUrl));

	}

	render() {
		const { project, files } = this.props;
		const filesArray = Array.from(files);
		return (
			<>
				<div className="panel panel-default">
					<div className="panel-heading">General Project Information</div>
					<div className="panel-body">
						<div className="row">
							<div className="col-sm-10">Id: {project && project.id}</div>
							<div className="col-sm-2 text-right">Robot type: {project && project.robot_type}</div>
						</div>
						<br></br>
						<div className="row">
							<div className="col-sm-8">Status: {project && project.status}</div>
							<div className="col-sm-4 text-right">Created date: {project && project.created_date}</div>
						</div>
					</div>
				</div>
				<div className="panel panel-default">
					<div className="panel-heading">Input File information</div>
					{filesArray && filesArray.map(file => {
						console.log(file.type)
						if(file.type == "uploaded"){
							return <ShowFiles key={file.id} file={file} downloadFile={this.downloadFile} />
						}
					})}
				</div>
				<div className="panel panel-default">
					<div className="panel-heading">Preview Result</div>
					{filesArray && filesArray.map(file => {
						console.log(file.type)
						if(file.type == "preview"){
							return <ShowFiles key={file.id} file={file} downloadFile={this.downloadFile} />
						}
					})}
				</div>
				<div className="panel panel-default">
					<div className="panel-heading">Full Calibration Report and URDF model of the calibrated robot</div>
					{project && project.payment_status != "Succeeded" ? 
					<StartPayment startPayment={this.startPayment}/>
					: 
					filesArray && filesArray.map(file => {
						console.log(file.type)
						if(file.type == "processed"){
							return <ShowFiles key={file.id} file={file} downloadFile={this.downloadFile} />
						}
					})}
				</div>
			</>
		)
	}

}
function mapStateToProps(state) {
	const { project } = state.project;
	const { files } = state.files;
	return {
		project,
		files
	};
}

const connectedProcessedPage = connect(mapStateToProps)(ProcessedPage);
export { connectedProcessedPage as ProcessedPage }; 
