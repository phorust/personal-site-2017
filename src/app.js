import React from 'react';
import { render } from 'react-dom';
import { Link, Route, Router } from 'react-router';

import About from './components/About.js';
import Blog from './components/Blog.js';
import Terminal from './components/Terminal.js';
import VisualPortfolio from './components/VisualPortfolio.js';

const App = React.createClass({
  render() {
    return (
      <div>
        <div id='visual_bg'></div>
        <div id='wrapper'>
          <img id='logo' src='i/kl.png' width='75px' />
          <div id='content'>
            {this.props.children}
          </div>
        </div>

        <nav>
          <ul>
            <li className='about'><Link to="about">A B O U T</Link></li>
            <li className='software'><Link to="term">C O D E</Link></li>
            <li className='visual'><Link to="visual">V I S U A L</Link></li>
            <li className='blog'><Link to="blog">B L O G</Link></li>
          </ul>
        </nav>
        <div id='banner'>
          Site still under construction! Check out progress
          <a target="_blank" href='http://github.com/phorust/phorust.github.io'> here.</a>
        </div>
      </div>
    );
  }
});

render((
  <Router>
    <Route path="/" component={App}>
      <Route path="/about" component={About}/>
      <Route path="/code" component={Terminal}/>
      <Route path="/visual" component={VisualPortfolio}/>
    </Route>
  </Router>
), document.getElementById('app'));
