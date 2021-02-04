import React, { Component } from 'react';
import { connect } from 'react-redux';
import { settingsAction } from '../../_actions/settings.action';
import BillingAddressForm from '../../_components/billingAddressForm';


class BillingAddressPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            billingData: {},
            submitted: false,
            edited: false,
            errorMessage: '',
            isCollapsed: false,
            isVisible: false
        };
        this.handleSubmitButton = this.handleSubmitButton.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleCancelButton = this.handleCancelButton.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCollapse = this.handleCollapse.bind(this);
    }


    componentDidMount = () => {
        const { dispatch, user } = this.props;
        dispatch(settingsAction.getBillingByUserId(user.id));
    }

    componentWillReceiveProps = (nextProps) =>{
        const billing = nextProps.billing;
        this.setState({ billingData : billing });

    }

    handleChange(e) {
        const { name, value } = e.target;
        const newBillingData = this.state.billingData;
        newBillingData[name] = value;
        this.setState({ billingData: newBillingData });
        console.log(this.state.billingData)

    }

    handleSubmitButton(event) {
        event.preventDefault();
        const billingData  = this.state.billingData;
        const dispatch = this.props.dispatch;
        if(billingData.id){
            dispatch(settingsAction.updateBillingById(billingData.billingo_id, billingData));
        }else {
            dispatch(settingsAction.addBilling(billingData));
        }

    }

    handleEditButton(event) {
        event.preventDefault();
        this.setState({ edited: true });
    }

    handleCancelButton(event) {
        event.preventDefault();
        this.setState({ edited: false });
    }

    handleCollapse(event){
        event.preventDefault();
        const { isCollapsed } = this.state;
        this.setState({isCollapsed: !isCollapsed})
    }

    render() {

        const { billingData, submitted, edited, isCollapsed } = this.state;
        const  billing  = this.props.billing;
        return (
            <>
                    <BillingAddressForm
                        billingData= { edited ? billingData : billing } 
                        handleChange = { this.handleChange }
                        handleSubmitButton = { this.handleSubmitButton }
                        handleEditButton = { this.handleEditButton }
                        handleCancelButton = { this.handleCancelButton }
                        submitted = { submitted }
                        edited = { edited }
                    />
            </>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    const { billing } = state.billing
    return {
        user,
        billing
    };
}

const connectedSettingsPage = connect(mapStateToProps)(BillingAddressPage);
export { connectedSettingsPage as SettingsPage }; 
