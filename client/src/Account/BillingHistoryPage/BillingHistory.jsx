import React, { Component } from 'react';
import { connect } from 'react-redux';
import { settingsAction } from '../../_actions/settings.action';
import {projectActions} from "../../_actions";
import HistoryList from "../../_components/historyList";

class BillingHistory extends Component {

    constructor(props) {
        super(props);
        this.download = this.download.bind(this);
    }
    componentDidMount = () => {
        const { dispatch } = this.props;
        dispatch(settingsAction.getBillingHistory());
    }

    download(e, id) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(projectActions.downloadInvoice(id));

    }

    render() {
        const { billingHistory } = this.props;
        console.log(billingHistory)
        return (
            <>
                {billingHistory  ? <HistoryList billingHistory={billingHistory} download={this.download} /> : ""}
            </>
        )
    }
}

function mapStateToProps(state) {
    const { billingHistory } = state.account;
    return {
        billingHistory
    };
}

const connectedSettingsPage = connect(mapStateToProps)(BillingHistory);
export { connectedSettingsPage as BillingHistoryPage }; 
