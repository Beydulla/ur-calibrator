import React, {Component} from 'react';
import {connect} from 'react-redux'
import ResetPasswordForm from "../../_components/resetPasswordForm";
import {settingsAction} from "../../_actions";
import { validatePassword } from "../../_helpers/utils"

class ResetPasswordPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            isSubmitted: false,
            errorMessage: '',
            isValid: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = e =>{
        const { name, value } = e.target;
        const newFormData = this.state.formData
        newFormData[name] = value;
        const errorMessage = validatePassword(newFormData.oldPassword, newFormData.newPassword);
        let isValid = false;
        if(errorMessage === ''){
            if(newFormData.confirmPassword === newFormData.newPassword){
                isValid = true;
            }
        }
        this.setState({ formData: newFormData, errorMessage: errorMessage, isValid:isValid });

    }

    handleSubmit = e =>{
        e.preventDefault();
        const { formData, errorMessage, isValid }  = this.state;
        if(errorMessage == '' && isValid){
            const dispatch = this.props.dispatch;
            dispatch(settingsAction.resetPassword(formData.oldPassword, formData.newPassword));
        }else{
            this.setState({isSubmitted: true})
        }
    }

    render() {
        return (
            <>
              <ResetPasswordForm
                  formData = {this.state.formData}
                  isSubmitted = {this.state.isSubmitted}
                  handleChange = {this.handleChange}
                  handleSubmit = {this.handleSubmit}
                  errorMessage = {this.state.errorMessage}
              />
            </>
        );
    }

}

function mapStateToProps(state){
    return{

    }
}

export default connect(mapStateToProps)(ResetPasswordPage);