import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../actions/userAction';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }
  onEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  onClickSave() {
    const { login } = this.props;
    login(this.state.email, this.state.password);
  }

  render() {
    return (
      <main>
        <center>
          <div className="section"></div>

          <h5 className="indigo-text">Login</h5>
          <div className="section"></div>

          <div className="container">
            <div className="z-depth-1 grey lighten-4 row customWidth">

              <div className="col s12">
                <div className='row'>
                  <div className='col s12'>
                  </div>
                </div>

                <div className='row'>
                  <div className='input-field col s12'>
                    <input className='' type='text'
                      name='email' id='email'
                      onChange={this.onEmailChange}
                      />
                  </div>
                </div>

                <div className='row'>
                  <div className='input-field col s12'>
                    <input className='validate' type='password'
                      name='password' id='password'
                      onChange={this.onPasswordChange}
                      />
                  </div>
                  <label>
                    <a className='pink-text' href='#!'><b>Forgot Password?</b></a>
                  </label>
                </div>

                <br />
                <center>
                  <div className='row'>
                    <button type='submit' name='btn_login'
                      className='col s12 btn btn-large waves-effect indigo'
                      value="save"
                      onClick={this.onClickSave}
                      >Login</button>
                  </div>
                </center>
              </div>
            </div>
          </div>
        </center>

        <div className="section"></div>
        <div className="section"></div>
      </main>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(userActions.login(email, password))
  }

}

const mapStateToProps = (state, ownProps) => {
  let user = { email: '' }
  return {
    users: user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
