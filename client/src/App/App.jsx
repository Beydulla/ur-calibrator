import React from 'react';
import {Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import  Confirm  from '../_components/Confirm';
import Navbar from '../Navbars/Navbar';
import { InitPage } from '../Workflow/InitPage/InitPage';
import { UploadPage } from '../Workflow/UploadPage/UploadPage';
import { ProcessingPage } from '../Workflow/ProcessingPage/ProcessingPage';
import { ProcessedPage } from '../Workflow/ProcessedPage/ProcessedPage';
import { SettingsPage } from '../Account/SettingsPage/BillingAddressPage';
import { BillingHistoryPage } from '../Account/BillingHistoryPage/BillingHistory';
import ResetPasswordPage from "../Account/SettingsPage/ResetPasswordPage";
import { ForgotPassword } from "../Account/ForgotPassword/ForgotPassword"
import { ResetForgottenPassword} from "../Account/ForgotPassword/ResetForgottenPassword";
import DeleteAccount from  "../Account/SettingsPage/DeleteAccount";
import requireAuth from '../_helpers/requireAuth'
import InitWorkflowData from '../_helpers/InitWorkflowData'
import ExpandWithSettingsNavbar from '../_helpers/expandWithSettingsNavbar'

class App extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }
    
    render() {
        const { alert, loggedIn } = this.props;
        return (
                <div className="container">
                    { loggedIn ? <Navbar /> : "" }
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                            <Route exact path="/" component={requireAuth(HomePage)} />
                            <Route path="/confirm/:key" component={Confirm} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/forgot-password" component={(ForgotPassword)} />
                            <Route path="/reset-password/:key" component={(ResetForgottenPassword)} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/projects/:id/init" component={InitWorkflowData(InitPage)} />
                            <Route path="/projects/:id/upload" component={InitWorkflowData(UploadPage)} />
                            <Route path="/projects/:id/processing" component={InitWorkflowData(ProcessingPage)} />
                            <Route path="/projects/:id/processed" component={InitWorkflowData(ProcessedPage)} />
                            <Route path="/settings" exact component={ExpandWithSettingsNavbar(requireAuth(SettingsPage))} />
                            <Route path="/settings/billing-history" component={ExpandWithSettingsNavbar(requireAuth(BillingHistoryPage))} />
                            <Route path="/settings/reset-password" component={ExpandWithSettingsNavbar(requireAuth(ResetPasswordPage))} />
                            <Route path="/settings/delete-account" component={ExpandWithSettingsNavbar(requireAuth(DeleteAccount))} />
                            </div>
                        </Router>
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        loggedIn: state.authentication.loggedIn
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 