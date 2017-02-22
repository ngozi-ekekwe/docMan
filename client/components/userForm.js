import React from 'react';
import TextInput from '../components/TextInput';

const UserForm = ({user, onSave, onChange, loading, errors}) => {
    return (
        <div className="container ">
        <div className="z-depth-1 grey lighten-4">
        <form>
            <TextInput
                name="firstname"
                label="firstname"
                defaultvalue={user.firstname}
                onChange={onChange}
                error={errors} />

            
            <TextInput
                name="Lastname"
                label="Lastname"
                defaultvalue={user.lastname}
                onChange={onChange}
                error={errors} />

            
            <TextInput
                name="username"
                label="username"
                defaultvalue={user.username}
                onChange={onChange}
                error={errors} />

            
            <TextInput
                name="email"
                label="email"
                defaultvalue={user.email}
                onChange={onChange}
                error={errors} />

            
            <TextInput
                name="password"
                label="password"
                defaultvalue={user.password}
                onChange={onChange}
                error={errors} />

            
            <TextInput
                name="role"
                label="role"
                defaultvalue={user.roleId}
                onChange={onChange}
                error={errors} />
            <input
                type="submit"
                disabled={loading}
                value={loading ? 'saving ...': 'save'}
                className=""
                onClick= {onSave} />
        </form>
        </div>
        </div>
    )
}

export default UserForm