import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'
import { projectActions } from '../../_actions/projects.action';
import config from 'config';


class UploadPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      robot_type: '',
      errorMessage: '',
      files: []
    };
    this.onDrop = (files) => {
      this.setState({ files })
      console.log(files);
    };

  }

  render() {
    const Input = ({ accept, onFiles, files, getFilesFromEvent }) => {
      const text = files.length > 0 ? 'Add more files' : 'Choose files'
    
      return (
        <label style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', padding: 15, borderRadius: 3 }}>
          {text}
          <input
            style={{ display: 'none' }}
            type="file"
            accept={accept}
            multiple
            onChange={e => {
              getFilesFromEvent(e).then(chosenFiles => {
                onFiles(chosenFiles)
              })
            }}
          />
        </label>
      )
    }
    const handleUpload = (files) => {
      console.log(files);
    }
  
    const handleSubmit = (files, allFiles) => {
      const {dispatch, project} = this.props;
      const data = {
        status: 'processing'
      }
      dispatch(projectActions.updateProject(project.id, data, 'processing', 'File(s) has been uploaded!'))
    }
  
    const getFilesFromEvent = e => {
      return new Promise(resolve => {
        getDroppedOrSelectedFiles(e).then(chosenFiles => {
          resolve(chosenFiles.map(f => f.fileObject))
        })
      })
    }
  
    const { project } = this.props;
    return (
      <Dropzone
        accept=".csv"
        getUploadParams={() => ({ url: `${config.apiUrl}/projects/${project.id}/upload` })}
        onSubmit={handleSubmit}
        InputComponent={Input}
        getFilesFromEvent={getFilesFromEvent}
      />
    )
  }
}



function mapStateToProps(state) {
  const { project } = state.project;
  return {
    project
  };
}

const connectedUploadPage = connect(mapStateToProps)(UploadPage);
export { connectedUploadPage as UploadPage }; 
