import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import * as documentAction from '../actions/documentAction';
import DocumentList from '../components/DocumentList';


class DocumentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: '',
      userId: ''
    };
    this.redirectToRolePage = this.redirectToRolePage.bind(this);
  }

  componentWillMount() {
    this.props.fetchDocuments();
  }
  redirectToRolePage() {
    browserHistory.push('/user');
  }

  render() {
    const { documents } = this.props;
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

const mapDispatchToProps = dispatch => ({
  fetchDocuments: () => dispatch(documentAction.fetchDocuments())
});

const mapStateToProps = state => ({
  documents: state.documents
});
export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
