import React from 'react';
import TextInput from '../components/TextInput';

const RoleForm = ({role, onSave, onChange, loading, errors}) => {
    return (
        <form method="POST">
            <TextInput
                name="title"
                label="Title"
                defaultvalue={role.title}
                onChange={onChange}
                error={errors} />

            <input
                type="submit"
                disabled={loading}
                value={loading ? 'saving ...' : 'save'}
                className='col s12 btn btn-large waves-effect indigo'
                onClick={onSave} />
        </form>
    )
}

export default RoleForm