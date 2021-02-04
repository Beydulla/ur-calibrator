import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {validatePassword} from "../../_helpers/utils";
import { userActions } from "../../_actions";

class ResetForgottenPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                newPassword: '',
                confirmPassword: '',
            },
            submitted: false,
            passwordValid:false,
            errorMessage: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        const formData = this.state.formData
        formData[name] = value;
        const errorMessage = validatePassword(null, formData.newPassword);
        let isValid = false;
        if(errorMessage === ''){
            if(formData.confirmPassword === formData.newPassword){
                isValid = true;
            }
        }
        this.setState({ formData: formData, errorMessage: errorMessage, passwordValid:isValid });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { dispatch } = this.props;

        if (this.state.passwordValid && this.state.password === this.state.confirmPassword) {
            let  key  = this.props.match.params.key
            dispatch(userActions.resetForgottenPassword(key, this.state.formData.newPassword));
        }
    }

    render() {
        const { formData, passwordValid, errorMessage, submitted } = this.state;
        return (

            <div className="col-lg-4 col-md-4 col-lg-offset-3 col-md-offset-3" style={{ marginTop:150}}>
                <h2 >Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !passwordValid ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="newPassword" value={formData.newPassword} onChange={this.handleChange} />
                        {submitted && !formData.newPassword &&
                        <div className="help-block">Password is required</div>
                        }
                        {submitted && formData.newPassword && !passwordValid  &&
                        <div className="help-block">{errorMessage}</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && (!formData.confirmPassword || formData.newPassword != formData.confirmPassword) ? ' has-error' : '')}>
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={this.handleChange} />
                        {submitted && formData.newPassword != formData.confirmPassword &&
                        <div className="help-block">Confirm password correctly</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Submit</button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { };
}

const connectedRegisterPage = connect(mapStateToProps)(ResetForgottenPassword);
export { connectedRegisterPage as ResetForgottenPassword };