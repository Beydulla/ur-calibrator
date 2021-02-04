import React, {Component} from 'react';
import {connect} from 'react-redux'
import {settingsAction} from "../../_actions";

class DeleteAccount extends Component{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit = e =>{
        e.preventDefault();
        let confirmed = confirm("Are you sure to delete your account?");
        if(confirmed){
            const { dispatch } = this.props;
            dispatch(settingsAction.deleteAccount());
        }
    }

    render() {
        return (
            <>
                <div className="panel panel-default">
                    <div className="panel-heading">Delete Your Account</div>
                    <div className="panel-body" style={{ width: '70%', marginLeft: '10%' }}>
                        <div className="form-group row">
                            <div className="text-center">
                                Once you delete your account, there is no going back. Please be certain.
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="text-center">
                                <button className="btn btn-danger" onClick={this.handleSubmit}>Delete your account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

function mapStateToProps(state){
    return{

    }
}

export default connect(mapStateToProps)(DeleteAccount);