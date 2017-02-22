import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TinyMCE from 'react-tinymce';


class CreateDocument extends React.Component {
	render() {
		return (
			<div>
				<center>
					<TinyMCE
						content=""
						config={{
							plugins: 'link image preview',
							toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
						}}
						onChange={this.handleEditorChange}
						/>
				</center>
			</div>
		);
	}
}

export default CreateDocument;