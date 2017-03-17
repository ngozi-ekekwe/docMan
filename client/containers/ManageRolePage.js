import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import * as roleActions from '../actions/roleAction';
import RoleForm from '../components/RoleForm';

class ManageRolePage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      role: Object.assign({}, this.props.role),
      errors: {},
      saving: false
    };
    this.updateRoleState = this.updateRoleState.bind(this);
    this.saveRole = this.saveRole.bind(this);
  }
  updateRoleState(event) {
    const field = event.target.name;
    const role = this.state.role;
    role[field] = event.target.value;
    return this.setState({ role });
  }

  saveRole(event) {
    event.preventDefault();
    this.props.saveRole(this.state.role);
    this.context.router.push('/roles');
    this.setState({ saving: true });
    toastr.success('Role saved');
  }

  render() {
    return (
      <div>
        <h5 className="z-depth-1 grey lighten-4 row">Add Role</h5>
        <RoleForm
          role={this.state.role}
          onChange={this.updateRoleState}
          onSave={this.saveRole}
          error={this.state.error} />
      </div>
    );
  }
}

ManageRolePage.PropTypes = {

};

ManageRolePage.contextTypes = {
  router: PropTypes.object
};
const mapDispatchToProps = dispatch => ({
  saveRole: role => dispatch(roleActions.saveRole(role))
});

const mapStateToProps = (state) => {
  const role = { id: '', title: '', createdAt: '', updatedAt: '' };
  return {
    roles: role
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageRolePage);
export { ManageRolePage as PureMyComponent };
