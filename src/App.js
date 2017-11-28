import React from 'react';
import ReactDOM from 'react-dom';
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
  'but you': importAll(
    require.context('./photos2/you', false, /\.(png|jpe?g|svg)$/),
  ),
};

const Sidebar = props =>
  <div className={'theOne ' + props.className}>
    {props.children}
    <div className="theOneInner">
      <span>
        Kevin writes code. He takes photos and makes layouts and the occasional
        graphic.
        <br />
        <br />
        <a href="http://instagram.com/kevinmlee.x" target="_blank">
          let's collab @kevinmlee.x
        </a>
      </span>
      <div className="line" />
      <Link to={{ pathname: '/photos/but you' }}>PHOTO</Link>
      {' · '}
      <Link to={{ pathname: '/mix/june' }}>MIX</Link>
    </div>
  </div>;

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showHider: true };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ showHider: false }), 5000);
  }

  render() {
    const { showHider } = this.state;
    const hider = showHider ? <div id="hider" /> : null;
    return (
      <div className="page black">
        <iframe
          src="https://player.vimeo.com/video/213032482?autoplay=1"
          width="640"
          height="360"
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
        />
        {hider}
      </div>
    );
  }
}

class Photos extends React.Component {
  _photowrapperInner;

  _onWheel = e => {
    e.preventDefault();
    const node = ReactDOM.findDOMNode(this._photowrapperInner);
    node.scrollLeft += e.deltaY;
  };

  render() {
    const { history, match, location } = this.props;
    console.log(match.params.set);
    const photoElems = images[match.params.set].map(src =>
      <img key={src} src={src} />,
    );
    return (
      <div className="page">
        <div className="photowrapper">
          <div
            className="photowrapperInner"
            ref={ref => (this._photowrapperInner = ref)}
            onWheel={this._onWheel}
          >
            {photoElems}
          </div>
        </div>
      </div>
    );
  }
}

const Mix = () => {
  return (
    <div className="page">
      <div className="photowrapper">
        <div className="photowrapperInner">todo</div>
      </div>
    </div>
  );
};

const routes = [
  {
    path: '/',
    exact: true,
    sidebar: () => <Sidebar className="black" />,
    main: Landing,
  },
  {
    path: '/photos/:set',
    sidebar: ({ match }) =>
      <Sidebar>
        <div className="nav">
          {Object.keys(images).map(subfolder =>
            <NavLink key={subfolder} to={{ pathname: `/photos/${subfolder}` }}>
              {subfolder + ' '}
            </NavLink>,
          )}
        </div>
      </Sidebar>,
    main: Photos,
  },
  {
    path: '/mix',
    sidebar: () =>
      <Sidebar>
        <div className="theOneDecor" />
      </Sidebar>,
    main: Mix,
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      horizontalScroll: true,
      background: 'white',
    };
    window.app = this;
  }

  _onMouseMove = e => {
    // const x = Math.floor(e.screenX / window.innerWidth * 128 + 127);
    // const y = Math.floor(e.screenY / window.innerHeight * -128 + 127);
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
        onMouseMove={this._onMouseMove}
        style={{ background: this.state.background }}
      >
        {routes.map((route, index) =>
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />,
        )}
        {routes.map((route, index) =>
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.sidebar}
          />,
        )}
      </div>
    );
  }
}

export default withRouter(App);
