import React, {propTypes} from 'react';

class UserPage extends React.Component {
    constructor(props, context) {
        super(props)
        this.state = {
            user: {
                firstname: "",
                lastnaem: "",
                username: "",
                email: "",
                password: "",
                role: ""
            }
        }
        this.onUserChange = this.onUserChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }
    onUserChange(event) {
        const user = this.state.user;
        this.setState({user: event.target.value});
    }

    onClickSave() {

    }
    render() {
        return(
            <div>
            <h1>User page</h1>
            </div>
        )
    }
}

export default UserPage;