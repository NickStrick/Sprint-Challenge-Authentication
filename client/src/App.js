import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import './App.css';

import Jokes from './components/Jokes.js';
import Signin from './components/Signin.js';
import SignUp from './components/SignUp.js';

class App extends Component {

  logout = ev => {
    ev.preventDefault();
    console.log('logout logged');
    localStorage.removeItem('jwt');
    window.location.reload();
  }

  render() {
    return (
      <div className="App">
        <header >
          <nav>
            <div className='links'>
              <NavLink to="/signup">SignUp</NavLink>
              <NavLink to="/signin">Signin</NavLink>
              <NavLink to="/jokes">Jokes</NavLink>
            </div>

            <button onClick={this.logout}>Logout</button>
          </nav>
        </header>
        <div className='main'>
          <Route path="/signup" render={props => (<SignUp {...props} />)} />
          <Route path="/signin" render={props => (<Signin {...props} />)} />
          <Route path="/jokes" component={Jokes} />
        </div>
      </div>
    );
  }
}

export default App;
