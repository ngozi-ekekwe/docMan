import React, { propTypes } from 'react';
import DocumentListRow from './DocumentListRow';

const DocumentList = ({documents}) => {
	return (
		<table className="table bordered">
			<thead>
				<tr>
					<th>S/N</th>
					<th></th>
					<th>Title</th>
					<th>Content</th>
					<th>Access</th>
					<th>User</th>
				</tr>
			</thead>
			{documents.map(document =>
				<DocumentListRow key={document.id} document={document} />
			)}
			<tbody>
			</tbody>
		</table>
	)
}

export default DocumentList