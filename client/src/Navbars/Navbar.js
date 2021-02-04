import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { logout } from "../_actions/user.actions"

class Navbar extends Component {
    constructor(props) {
      super(props);
      this.logout = this.logout.bind(this);
    } 
    
    logout(e){
      e.preventDefault();
      this.props.logout();
    }

    render() {
      const { user } = this.props;
      return(
            <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="/">UR Calibrator</a>
              </div>
              <ul className="nav navbar-nav">
                <li ><a href="/">Projects</a></li>
                <li><a href="#" >Documentation</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
              <li className="dropdown right"><a className="dropdown-toggle" data-toggle="dropdown" href="#">{user.email} <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#" onClick={this.logout}>Log out</a></li>
                    <li><a href="/settings">Account settings</a></li>
                  </ul>
                </li>
            </ul>
            </div>
          </nav>
        )
    }
}

Navbar.propTypes =  {
  logout : PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    user: state.authentication.user
  };
}
export default connect(mapStateToProps, {logout}) (Navbar);