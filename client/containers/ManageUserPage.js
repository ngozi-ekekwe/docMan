import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import * as userAction from '../actions/userAction';
import UserForm from '../components/userForm';



class ManageUserPage extends React.Component{
    constructor(props,context) {
        super(props, context)
        this.state = {
            
        }
        
    }

    updateUserState(events) {

    }

    saveUser(event) {

    }

    render() {
        return (
            <div>
                <UserForm />
            </div>
        )
    }
}

export default ManageUserPage;