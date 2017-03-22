import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as userAction from '../actions/userAction';
import UserList from '../components/UserList';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.redirectToRolePage = this.redirectToRolePage.bind(this);
  }

  redirectToRolePage() {
    browserHistory.push('/user');
  }

  componentDidMount() {
    this.props.actions.fetchUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <UserList usersList={users} />
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


const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userAction, dispatch)
  };
};

const mapStateToProps = (state) => {
  return Object.assign({}, state);
};
export default connect(mapStateToProps, mapDispatchToProps)(User);
export { User as PureMyComponent };
