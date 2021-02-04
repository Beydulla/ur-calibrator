import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { history } from '../_helpers';
import jwt_decode from "jwt-decode";


export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (this.props.loggedIn) {
        const { exp } = jwt_decode(localStorage.getItem('jwtToken'))
        if (Date.now() >= exp * 1000) {
          history.push('/login');
        }
      }else{
        history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.loggedIn) {
        history.push('/login');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    loggedIn: PropTypes.bool.isRequired
  }

  function mapStateToProps(state) {
    return {
        loggedIn: state.authentication.loggedIn
    };
  }

  return connect(mapStateToProps)(Authenticate);
}