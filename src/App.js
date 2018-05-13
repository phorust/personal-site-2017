import React from 'react';
import {Route, NavLink, withRouter} from 'react-router-dom';
import Sidebar from './Sidebar.react';
import Photos from './Photos.react';
import Landing from './Landing.react';
import Story from './Story.react';
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
    sidebar: () => <Sidebar className="black" />,
    main: Landing,
  },
  {
    path: '/photos/:set',
    sidebar: () => (
      <Sidebar>
        <div className="nav">
          places
          <br />
          <div style={{textAlign: 'right'}}>
            <NavLink to={{pathname: `/photos/asian`}}>asia </NavLink>
            <br />
            <NavLink to={{pathname: `/photos/americana`}}>americana </NavLink>
            <br />
            <NavLink to={{pathname: `/photos/the drive home`}}>
              the drive home{' '}
            </NavLink>
            <br />
            <NavLink to={{pathname: `/photos/iceland`}}>iceland </NavLink>
          </div>
          <br />
          <br />
          people
          <br />
          <div style={{textAlign: 'right'}}>
            <NavLink to={{pathname: `/photos/before`}}>before </NavLink>
            <br />
            <NavLink to={{pathname: `/photos/family`}}>family </NavLink>
            <br />
            <NavLink to={{pathname: `/photos/but you`}}>but you </NavLink>
          </div>
        </div>
      </Sidebar>
    ),
    main: Photos,
  },
  {
    path: '/mix',
    sidebar: () => (
      <Sidebar>
        <div className="theOneDecor" />
      </Sidebar>
    ),
    main: Mix,
  },
  {
    path: '/stories/:set',
    sidebar: () => (
      <Sidebar>
        <div className="nav">
          <div style={{textAlign: 'right'}}>
            <NavLink to={{pathname: `/stories/oakland just yesterday`}}>
              oakland, just yesterday
            </NavLink>
            <br />
            <NavLink to={{pathname: `/stories/ghosts`}}>ghosts</NavLink>
            <br />
          </div>
        </div>
      </Sidebar>
    ),
    main: Story,
  },
];

const App = () => (
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
    {routes.map(route => (
      <Route
        key={route.path}
        path={route.path}
        exact={route.exact}
        component={route.sidebar}
      />
    ))}
  </div>
);

export default withRouter(App);
