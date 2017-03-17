import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as userAction from '../actions/userAction';
import UserList from '../components/UserList';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      roleId: ''
    };
    this.redirectToRolePage = this.redirectToRolePage.bind(this);
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  redirectToRolePage() {
    browserHistory.push('/user');
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <UserList users={users} />
        <input
          type="submit"
          value="Add new User"
          className=""
          onClick={this.redirectToRolePage} />
      </div>
    );
  }
}

User.PropTypes = {
  users: PropTypes.array.isRequired
};

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(userAction.fetchUsers())
});

const mapStateToProps = state => ({
  users: state.users
});
export default connect(mapStateToProps, mapDispatchToProps)(User);
export { User as PureMyComponent };
