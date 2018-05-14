import React from 'react';
import {Route, NavLink, withRouter} from 'react-router-dom';
import Photos from './Photos.react';
import Landing from './Landing.react';
import Story from './Story.react';
import About from './About.react';
import Topbar from './Topbar.react';
import './App.css';

const Mix = () => (
  <div className="page">
    <div className="photowrapper">
      <div className="photowrapperInner">todo</div>
    </div>
  </div>
);

const routes = [
  {
    path: '/',
    exact: true,
    main: Landing,
  },
  {
    path: '/photos/:set',
    main: Photos,
  },
  {
    path: '/mix',
    main: Mix,
  },
  {
    path: '/stories/:set',
    main: Story,
  },
  {
    path: '/about',
    main: About,
  },
];

const App = ({location}) => (
  // const unused = (
  // <div>
  // <div className="kevin">Kevin</div>
  // <div className="mngyuan">梦远</div>
  // <div className="lee">Lee</div>
  // </div>
  // );
  <div className="container">
    {routes.map(route => (
      <Route
        key={route.path}
        path={route.path}
        exact={route.exact}
        component={route.main}
      />
    ))}
    <Topbar black={location.pathname === '/'} />
  </div>
);

export default withRouter(App);
