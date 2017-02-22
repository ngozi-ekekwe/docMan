import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import * as userAction from '../actions/userAction';
import UserList from '../components/UserList';
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

	componentWillMount() {
		this.props.fetchUsers();
	}
  render() {
    const {users} = this.props
    return (
      <div>
        <UserList users={users} />
        <input
          type="submit"
          value='Add new User'
          className=""
          onClick={this.redirectToRolePage} />
      </div>
    );
  }
}

User.PropTypes = {
  users: PropTypes.array.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(userAction.createUser(user)),
    fetchUsers: () => dispatch(userAction.fetchUsers())
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users
  };
  ;
}
export default connect(mapStateToProps, mapDispatchToProps)(User);