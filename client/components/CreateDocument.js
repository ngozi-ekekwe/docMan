import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TinyMCE from 'react-tinymce';


class CreateDocument extends React.Component {
	render() {
		return (
				<div>
					<form>
						<input id="first_name" type="text" className="validate" />
						<label for="first_name">First Name</label>
						<center>
							<TinyMCE
								content=""
								config={{
									plugins: 'link image preview',
									toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
								}}
								onChange={this.handleEditorChange}
								/>
							<p>
								<input type="checkbox" id="test5" />
								<label for="test5">Private</label>
							</p>
							<button type='submit' name='btn_login'
              	className='col s12 btn btn-large waves-effect indigo'
                value="save"
              >Save Document</button>
						</center>
					</form>
				</div>
		);
	}
}

export default CreateDocument;