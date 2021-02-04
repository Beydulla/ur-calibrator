import React, { Component } from 'react';
import { connect } from 'react-redux';
import { projectActions } from '../_actions/projects.action';
import './styles.css'

class ProjectsList extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    setTimeout(
      function () {
        const { dispatch, loading, project } = this.props;
        if (loading != true && project && project.id) {
          dispatch(projectActions.getFilesByProjectId(project.id));
        }
      }.bind(this), 300);

  }

  render() {


    return (
<div className="ticket ">
	
		<div className="collapse-header collapsed italy-header" data-id=" item.id " data-folder-id=" item.itemId " data-toggle="collapse" data-target="#ticket-assign- item.itemId " > 
			<div className="badge inv-status inv-open">  item.status.toUpperCase() </div> 
			
			<div className="badge inv-status inv-missing">MISSING DATA</div> 
			
	
			<div className="ticket-info-line"> 
				<div className="ticket-info"><span className="req-id">  item.itemId </span></div> 
				<div className="ticket-info req-type right">  item.vendorName </div> 
			</div> 
			
			 if (!isFieldEmpty(item.poNumber) || item.hasEmail=="EMAIL") { 
			<div className="ticket-info-line"> 
			
			 if (!isFieldEmpty(item.poNumber)) { 
				<div className="ticket-info req-id">  item.poNumber  </div> 
			 } else if (item.hasEmail=="EMAIL") { 
				<div className="ticket-info req-id">REQUESTER_EMAIL_FILLED</div> 
			 } 
			
		
			</div> 
			 } 
			
			<div className="ticket-info-line last-line-info"> 
				<div className="ticket-info"><span className="req-id">item.createTs  </span></div> 
				<div className="ticket-info req-type right"> item.companyCode </div> 
			</div> 
			
			<div className="ticket-info-line chevrondown-center"><span className="glyphicon glyphicon-chevron-down"></span></div>
			
		</div> 
	
			<div className="invoice-status-details"></div>
			<div className="invoice-requester-details"></div>

			<div className="ticket-info-line de-line"> 
				<div className="ticket-info"><span className="req-id">Details</span></div> 
			</div> 
			<div className="invoice-extra-details">
				<table className="table table-striped table-bordered"> 
					<tbody> 
						 _.each(item, function(val,key) {  
							<tr><td> key </td> <td>  val  </td></tr> 
						 })  	
					</tbody> 
				</table>
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

const connectedProjectsList = connect(mapStateToProps)(ProjectsList);
export { connectedProjectsList as ProjectsList }; 
