import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as roleActions from '../actions/roleAction';
import RoleForm from '../components/RoleForm'
import toastr from 'toastr';

class ManageRolePage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      role: Object.assign({}, this.props.role),
      errors: {},
      saving: false
    }
    this.updateRoleState = this.updateRoleState.bind(this);
    this.saveRole = this.saveRole.bind(this);
  }
  updateRoleState(event) {
    const field = event.target.name;
    let role = this.state.role;
    role[field] = event.target.value;
    return this.setState({role: role})

  }
  
  saveRole(event) {
    event.preventDefault();
    this.props.saveRole(this.state.role);
    this.context.router.push('/roles');
    this.setState({saving: true});
    toastr.success('Role saved')
  }
  
  render() {
    return (
      <div>
        <center>
        <h5 className="indigo-text">Create account</h5>
        </center>
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
export {ManageRolePage as PureMyComponent}
