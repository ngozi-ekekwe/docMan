import React from 'react';
import TextInput from '../components/TextInput';

const RoleForm = ({role, onSave, onChange, loading, errors}) => {
    return (
        <form>
            <TextInput
                name="title"
                label="Title"
                defaultvalue={role.title}
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

export default RoleForm