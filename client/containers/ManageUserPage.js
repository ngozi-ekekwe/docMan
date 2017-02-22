import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import * as userAction from '../actions/userAction';
import UserForm from '../components/userForm';


class ManageUserPage extends React.Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			users: Object.assign({}, this.props.user),
			errors: {},
			saving: false
		}
	}
	updateUserState(events) {
		const field = event.target.name;
		let user = this.state.user;
		user[field] = event.target.value;
		return this.setState({ user: user })
	}

	saveUser(event) {
		event.preventDefault();
		this.props.saveUser(this.state.user);
		this.context.router.push('/user');
		this.setState({ saving: true });
		toastr.success('User saved')
	}

	render() {
		return (
			<div>
				<h2>Manage Users</h2>
				<UserForm
					user={this.state.users}
					onChange={this.updateUserState}
					onSave={this.saveUser}
					error={this.state.error} />/>
            </div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		saveUser: (user) => dispatch(userAction.saveUser(user))
	}

}

const mapStateToProps = (state, ownProps) => {
	let user = { id: '', firstname: '', lastname: '', username: '', email: '', password: '', role: '' }
	return {
		users: user
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageUserPage);