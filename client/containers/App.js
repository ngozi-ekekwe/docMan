import React, {PropTypes} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}
App.PropTypes = {
    children: PropTypes.object.isRequired
}

export default App;