import React, {Component} from 'react';
import { connect } from 'react-redux';
import SettingsNavBar from "../Navbars/SettingsNavBar";

export default function(ComposedComponent) {
    class ExpandWithSettingsNavbar extends Component {
        render() {
            return (
                <div className="settings-container">
                    <div className="flex-shrink-0 settings-navbar ">
                    <SettingsNavBar/>
                    </div>
                    <div className="flex-shrink-0 settings-content ">
                    <ComposedComponent {...this.props} />
                    </div>
                </div>
            );
        }
    }

    function mapStateToProps(state) {
        return {

        };
    }

    return connect(mapStateToProps)(ExpandWithSettingsNavbar);
}