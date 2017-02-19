import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as roleActions from '../actions/roleAction';
import RoleForm from '../components/RoleForm'

class ManageRolePage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      role: Object.assign({}, this.props.role),
      errors: {}
    }
    this.updateRoleState = this.updateRoleState.bind(this);
    this.saveRole = this.saveRole.bind(this);
  }
  updateRoleState(event) {
    console.log(this.props)
    const field = event.target.name;
    let role = this.state.role;
    role[field] = event.target.value;
    return this.setState({role: role})

  }
  
  saveRole(event) {
    event.preventDefault();
    this.props.saveRole(this.state.role);
    console.log(this.context)
    this.context.router.push('/createrole');
  }
  render() {
    return (
      <div>
        <h1>Manage roles</h1>
        <RoleForm
          role={this.state.role}
          onChange={this.updateRoleState}
          onSave={this.saveRole}
          error={this.state.error} />
      </div>
    )
  }
}

ManageRolePage.PropTypes = {

}

ManageRolePage.contextTypes = {
  router: PropTypes.object
}
const mapDispatchToProps = (dispatch) => {
  return {
    saveRole: (role) => dispatch(roleActions.saveRole(role))
  }

}

const mapStateToProps = (state, ownProps) => {
  let role = { id: '', title: '', createdAt: '', updatedAt: '' }
  return {
    roles: role
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageRolePage)
