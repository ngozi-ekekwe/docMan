import React, { PropTypes } from 'react';
import DocumentContainer from '../containers/DocumentContainer';
import TextInput from '../components/TextInput';
import DocumentMarkdown from '../components/DocumentMarkdown';
import TinyMCE from 'react-tinymce';


const DocumentForm = ({document, onChange, onSave, errors}) => {
	return (
			<form>
				<div className="row">
					<div className="col s4">
						<TextInput
							name="title"
							label="Title"
							defaultvalue={document.title}
							onChange={onChange}
							error={errors} />
					</div>
					<div className="col s4">
						<TextInput
							name="userId"
							label="User"
							defaultvalue={document.userId}
							onChange={onChange}
							error={errors} />
					</div>
					<div className="col s4">
						<TextInput
							name="access"
							label="Access"
							defaultvalue={document.access}
							onChange={onChange}
							error={errors} />
					</div>
				</div>
			</form>
	)
}

export default DocumentForm;
