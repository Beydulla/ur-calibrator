import React, {Component} from 'react';
import {connect} from 'react-redux'
import '../Account/SettingsPage/style.css'

class SettingsNavBar extends Component{
    render() {
        return (
            <>
                <nav className="menu" aria-label="Repository settings">
                    <a className="menu-item" aria-current="page"  href="/settings">Billing Address</a>

                    <a className=" menu-item" aria-current="page" href="/settings/reset-password">Reset Password</a>

                    <a className="menu-item" aria-current="page"  href="/settings/billing-history">Billing History</a>

                    <a className="menu-item" aria-current="page"  href="/settings/delete-account">Delete Account</a>

                </nav>
            </>
        );
    }

}

function mapStateToProps(state){
return{

}
}

export default connect(mapStateToProps)(SettingsNavBar);