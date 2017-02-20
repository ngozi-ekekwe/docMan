import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as roleAction from '../actions/roleAction';
import RoleList from '../components/RoleList';
import RoleListRow from '../components/RoleListRow';
import {browserHistory} from 'react-router';

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      role: ""
    }
    this.redirectToRolePage = this.redirectToRolePage.bind(this);
  };
  redirectToRolePage() {
    browserHistory.push('/user');
  }
  render() {
    console.log(this.props)
    const {roles} = this.props;
    return (
      <div>
        <input
          type="submit"
          value='Add Role'
          className=""
          onClick={this.redirectToRolePage} />
        <RoleList roles={roles} />

      </div>
    );
  }
}

Role.PropTypes = {
  roles: PropTypes.array.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRole: (role) => dispatch(roleAction.createRole(role))
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users
  };
  ;
}
export default connect(mapStateToProps, mapDispatchToProps)(Role);