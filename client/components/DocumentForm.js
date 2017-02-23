import React from 'react';
import TextInput from '../components/TextInput';
import CreateDocument from '../components/CreateDocument';

const DocumentForm = ({document, onSave, onChange, loading, errors}) => {
	return (
		<div className="container ">
			<div className="z-depth-1 grey lighten-4">

				<CreateDocument />
				
			</div>
		</div>
	)
}

export default DocumentForm