import React from 'react';


const StartPayment = (props) => {
	const project = props.project;
	return (
		<div className="panel-body" style={{textAlign:"center", margin: 10 }}>
			<p>You will be able to see Full Result after successful payment.</p>
			<p>100 000 HUF.</p>
			<div className="col-sm-6 col-sm-offset-3"><button type="button" className="btn btn-success" onClick={props.startPayment} >Start Payment</button> </div>
		</div>
	)
}
export default StartPayment;