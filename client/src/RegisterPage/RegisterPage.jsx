import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {validatePassword} from "../_helpers/utils";


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                id: '',
                email: '',
                password: '',
                confirm_password: '',
                created_date: '',
            },
            submitted: false,
            emailValid:false,
            passwordValid:false,
            errorMessage: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
        if(user.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            this.setState({emailValid: true});
        }
        else{
            this.setState({emailValid:false});
        }
        const errorMessage = validatePassword(null, user.password);
        if(errorMessage){
            this.setState({errorMessage:errorMessage, passwordValid:false});
        }else{
            this.setState({passwordValid:true});
        }
            
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user, emailValid, passwordValid} = this.state;
        const { dispatch } = this.props;

        if (emailValid && passwordValid && user.confirm_password === user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted, emailValid, passwordValid, errorMessage } = this.state;
        return (
           
            <div className="col-lg-4 col-md-4 col-lg-offset-3 col-md-offset-3" style={{ marginTop:150}}>
                <h2 >Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                   
                    <div className={'form-group' + (submitted && !emailValid ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                        {submitted && !emailValid &&
                            <div className="help-block">Email is not correct</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !passwordValid ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password && 
                            <div className="help-block">Password is required</div>
                        }
                        {submitted && user.password && !passwordValid  &&
                            <div className="help-block">{errorMessage}</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && (!user.confirm_password || user.password != user.confirm_password) ? ' has-error' : '')}>
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" className="form-control" name="confirm_password" value={user.confirm_password} onChange={this.handleChange} />
                        {submitted && user.password != user.confirm_password &&
                            <div className="help-block">Cofirm password correctly</div>
                        }                       
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        {registering && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };