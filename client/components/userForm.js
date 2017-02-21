import React from 'react';
import TextInput from '../components/TextInput';

const UserForm = ({user, onSave, onChange, loading, errors}) => {
    return (
        <form>
            <TextInput
                name="title"
                label="Title"
                defaultvalue={user.firstname}
                onChange={onChange}
                error={errors} />

            
            <TextInput
                name="title"
                label="Title"
                defaultvalue={user.lastname}
                onChange={onChange}
                error={errors} />

            
            <TextInput
                name="title"
                label="Title"
                defaultvalue={user.username}
                onChange={onChange}
                error={errors} />

            
            <TextInput
                name="title"
                label="Title"
                defaultvalue={user.email}
                onChange={onChange}
                error={errors} />

            
            <TextInput
                name="title"
                label="Title"
                defaultvalue={user.password}
                onChange={onChange}
                error={errors} />

            
            <TextInput
                name="title"
                label="Title"
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
    )
}

export default UserForm