import { connect } from 'react-redux';
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../_helpers/spinner'
import { userActions } from '../_actions';


class Confirm extends Component {
  

  componentDidMount = () => {
    let  key  = this.props.match.params.key
    const { dispatch } = this.props;
    dispatch(userActions.confirm(key));
  }
  
  render = () =>
    <div className='confirm'>
       <Spinner size='8x' spinning={'spinning'} /> 
    </div>
}

function mapDispatchToProps (dispatch) {
  
  return {
    //confirm:(key) => dispatch(confirm(key))
  }
}

export default connect(
  mapDispatchToProps
)(Confirm)