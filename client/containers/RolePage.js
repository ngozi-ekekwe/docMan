import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as roleAction from '../actions/roleAction';
import RoleList from '../components/RoleList';
import RoleListRow from '../components/RoleListRow';
import {browserHistory} from 'react-router';

class Role extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roles: ""
    }
    this.redirectToRolePage = this.redirectToRolePage.bind(this);
  };
  componentWillMount() {
    this.props.loadRoles();
  }
  redirectToRolePage() {
    browserHistory.push('/role');
  }
  render() {
    const {roles} = this.props;
    return (
      <div className="page-wrapper">
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
    createRole: (role) => dispatch(roleAction.createRole(role)),
    loadRoles: () => dispatch(roleAction.fetchRoles())
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    roles: state.roles
  };
  ;
}
export default connect(mapStateToProps, mapDispatchToProps)(Role);
export { Role as PureMyComponent}