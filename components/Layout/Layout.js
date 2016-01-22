/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import './Layout.scss';
import Navigation from '../Navigation';

function Layout({ children }) {
  return (
    <div className="Layout">
      <div id='visual_bg'></div>
      <Navigation />
      <div id="wrapper">
        <img id='logo' src='i/kl.png' width='75px' />
        <TransitionGroup transitionName="contentfade"
                         transitionEnterTimeout={500}
                         transitionLeaveTimeout={500}>
          {children}
        </TransitionGroup>
      </div>
      <div id='banner'>
        Site still under construction! Check out progress
        { } <a target="_blank" href='http://github.com/phorust/phorust.github.io'>here.</a>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
