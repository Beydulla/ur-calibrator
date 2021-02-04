import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';


class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            submitted: false,
            emailValid:false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ email: event.target.value });
        if(this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            this.setState({emailValid: true});
        }else{
            this.setState({emailValid:false});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { dispatch } = this.props;
        if (this.state.emailValid) {
            dispatch(userActions.forgotPassword(this.state.email));
        }
    }

    render() {
        const { email, submitted, emailValid } = this.state;
        return (

            <div className="col-lg-4 col-md-4 col-lg-offset-3 col-md-offset-3" style={{ marginTop:150}}>
                <h2 >Reset Password</h2>
                <br/>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !emailValid ? ' has-error' : '')}>
                        <label htmlFor="email">Email address</label>
                        <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                        {submitted && !emailValid &&  <div className="help-block">Email is not correct</div> }
                    </div>
                    <br/>
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

const connectedRegisterPage = connect(mapStateToProps)(ForgotPassword);
export { connectedRegisterPage as ForgotPassword };