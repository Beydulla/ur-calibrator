import React from 'react';
import { formatDate } from '../../_helpers/utils'

const ShowFiles = (props) => {
	const file = props.file;
	return (
		<div className="panel panel-default" style={{ margin: 10 }}>
			<div className="row">
			<div className="panel-heading">
				<div className="col-sm-8"> Name: { file.name } </div>
				<div className="col-sm-4 text-right"><button type="button" className="btn btn-primary" onClick={() => props.downloadFile(file.id)} >Download</button> </div>
			</div>
			</div>
			<div className="panel-body">
				<div className="row">
					<div className="col-sm-8">Id: {file.id} </div>
					<div className="col-sm-4 text-right">Created Date: {formatDate(file.uploaded_date)} </div>
				</div>
			</div>
		</div>
	)
}
export default ShowFiles;