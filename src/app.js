import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './App.css';

const importAll = r => r.keys().map(r);
const images = {
  asian: importAll(
    require.context('./photos2/asia', false, /\.(png|jpe?g|svg)$/),
  ),
  americana: importAll(
    require.context('./photos2/americana', false, /\.(png|jpe?g|svg)$/),
  ),
  before: importAll(
    require.context('./photos2/before', false, /\.(png|jpe?g|svg)$/),
  ),
  'the drive home': importAll(
    require.context('./photos2/drive home', false, /\.(png|jpe?g|svg)$/),
  ),
  family: importAll(
    require.context('./photos2/family', false, /\.(png|jpe?g|svg)$/),
  ),
  iceland: importAll(
    require.context('./photos2/iceland', false, /\.(png|jpe?g|svg)$/),
  ),
  'new homes': importAll(
    require.context('./photos2/new homes', false, /\.(png|jpe?g|svg)$/),
  ),
  'not for me': importAll(
    require.context('./photos2/not for me', false, /\.(png|jpe?g|svg)$/),
  ),
  'but you': importAll(require.context('./photos2/you', false, /\.(png|jpe?g|svg)$/)),
};

const Empty = () => <div />;

const Photos = ({ history, match, location }) => {
  console.log(match.params.set);
  const photoElems = images[match.params.set].map(src =>
    <img key={src} src={src} />,
  );
  return (
    <div className="photowrapper">
      <div className="photowrapperInner">
        {photoElems}
      </div>
    </div>
  );
};

const Mix = () => {
  return (
    <div className="photowrapper">
      <div className="photowrapperInner">
        todo
      </div>
    </div>
  );
};

const routes = [
  {
    path: '/',
    exact: true,
    sidebar: () => <div className="theOneDecor" />,
    main: Empty,
  },
  {
    path: '/photos/:set',
    sidebar: ({ match }) =>
      <div className="nav">
        {Object.keys(images).map(subfolder =>
          <NavLink key={subfolder} to={{ pathname: `/photos/${subfolder}` }}>
            {subfolder + ' '}
          </NavLink>,
        )}
      </div>,
    main: Photos,
  },
  {
    path: '/mix',
    sidebar: () => <div className="theOneDecor" />,
    main: Mix,
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      horizontalScroll: false,
      background: 'white',
    };
    window.app = this;
  }

  _onWheel = e => {
    if (this.state.horizontalScroll) {
      e.preventDefault();
      window.scrollBy(e.deltaY, 0);
    } else {
      // console.log(e.deltaY);
    }
  };

  _onMouseMove = e => {
    const x = Math.floor(e.screenX / window.innerWidth * 128 + 127);
    const y = Math.floor(e.screenY / window.innerHeight * -128 + 127);
    // console.log(x, y);
    // this.setState({background: `rgba(${x}, ${y}, 187, 0.4)`});
  };

  render() {
    const unused = (
      <div>
        <div className="kevin">Kevin</div>
        <div className="mngyuan">梦远</div>
        <div className="lee">Lee</div>
      </div>
    );
    return (
      <div
        className="container"
        onWheel={this._onWheel}
        onMouseMove={this._onMouseMove}
        style={{ background: this.state.background }}
      >
        <div className="page">
          {routes.map((route, index) =>
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />,
          )}
          <div className="theOne">
            {routes.map((route, index) =>
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.sidebar}
              />,
            )}
            <div className="theOneInner">
              <span>
                Kevin writes code for facebook. He takes photos for fun. This
                site is under construction.
              </span>
              <div className="line" />
              <Link to={{ pathname: '/photos/but you' }}>PHOTO</Link>
              {' · '}
              <Link to={{ pathname: '/mix/june' }}>MIX</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
