import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import * as documentAction from '../actions/documentAction';
import DocumentList from '../components/DocumentList';
import {browserHistory} from 'react-router';

class DocumentPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      content: "",
      access: "",
      userId: ""
    }
    this.redirectToRolePage = this.redirectToRolePage.bind(this);
  };
  redirectToRolePage() {
    browserHistory.push('/user');
  }

	componentWillMount() {
		this.props.fetchDocuments();
	}
  render() {
    const {documents} = this.props
    console.log(this.props, 'this is props');
    return (
      <div>
        <DocumentList documents={documents} />
      </div>
    );
  }
}

DocumentPage.PropTypes = {
  documents: PropTypes.array.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDocuments: () => dispatch(documentAction.fetchDocuments())
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    documents: state.documents
  };
  ;
}
export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
