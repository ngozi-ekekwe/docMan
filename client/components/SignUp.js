import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../actions/userAction';

const Register = ({user, onSave, onChange, loading, errors}) => {
    return (
      <main>
        <center>
          <div className="section"></div>

          <h5 className="indigo-text">Create account</h5>
          <div className="section"></div>

          <div className="container">
            <div className="z-depth-1 grey lighten-4 row">

              <form className="col s12" method="post">
                <div className='row'>
                  <div className='col s12'>
                  </div>
                </div>

                <div className='row'>
                  <div className='input-field col s12'>
                    <input className='validate' type='email' name='email' id='email' />
                    <label for='email'>Enter your firstname</label>
                  </div>
                </div>


                <div className='row'>
                  <div className='input-field col s12'>
                    <input className='validate' type='email' name='email' id='email' />
                    <label for='email'>Enter your lastname</label>
                  </div>
                </div>


                <div className='row'>
                  <div className='input-field col s12'>
                    <input className='validate' type='email' name='email' id='email' />
                    <label for='email'>Enter your username</label>
                  </div>
                </div>


                <div className='row'>
                  <div className='input-field col s12'>
                    <input className='validate' type='email' name='email' id='email' />
                    <label for='email'>Enter your email</label>
                  </div>
                </div>

                <div className='row'>
                  <div className='input-field col s12'>
                    <input className='validate' type='password' name='password' id='password' />
                    <label for='password'>Enter your password</label>
                  </div>
                  <label>
                    <a className='pink-text' href='#!'><b>Forgot Password?</b></a>
                  </label>
                </div>

                <br />
                <center>
                  <div className='row'>
                    <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Login</button>
                  </div>
                </center>
              </form>
            </div>
          </div>
          <a href="#!">Login</a>
        </center>

        <div className="section"></div>
        <div className="section"></div>
      </main>
    );
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveUser: (user) => dispatch(userActions.saveUser(user))
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    users: user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);