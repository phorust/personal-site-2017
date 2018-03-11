import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Stories from "./Stories";
import "./App.css";

const importAll = r => r.keys().map(r);
const importAllAsDict = r =>
  r
    .keys()
    .reduce(
      (agg, cur) => ({ ...agg, [cur]: <img key={cur} src={r(cur)} /> }),
      {}
    );
const importAllAsArray = r =>
  r.keys().reduce((agg, cur) => [...agg, <img key={cur} src={r(cur)} />], []);
const photos = {
  asian: importAll(
    require.context("./photos2/asia", false, /\.(png|jpe?g|svg)$/)
  ),
  americana: importAll(
    require.context("./photos2/americana", false, /\.(png|jpe?g|svg)$/)
  ),
  before: importAll(
    require.context("./photos2/before", false, /\.(png|jpe?g|svg)$/)
  ),
  "the drive home": importAll(
    require.context("./photos2/drive home", false, /\.(png|jpe?g|svg)$/)
  ),
  family: importAll(
    require.context("./photos2/family", false, /\.(png|jpe?g|svg)$/)
  ),
  iceland: importAll(
    require.context("./photos2/iceland", false, /\.(png|jpe?g|svg)$/)
  ),
  "not for me": importAll(
    require.context("./photos2/not for me", false, /\.(png|jpe?g|svg)$/)
  ),
  "but you": importAll(
    require.context("./photos2/you", false, /\.(png|jpe?g|svg)$/)
  )
};
const stories = {
  "oakland just yesterday": importAllAsArray(
    require.context(
      "./stories/oakland just yesterday",
      false,
      /\.(png|jpe?g|svg)$/
    )
  ),
  ghosts: importAllAsArray(
    require.context("./stories/ghosts", false, /\.(png|jpe?g|svg)$/)
  )
};

const Sidebar = props => (
  <div className={"theOne " + props.className}>
    {props.children}
    <div className="theOneInner">
      <span>
        Kevin writes code. He takes photos and makes layouts and the occasional
        graphic.
        <br />
        <br />
        <a href="http://instagram.com/mngyuan" target="_blank">
          @mngyuan
        </a>
      </span>
      <div className="line" />
      <Link to={{ pathname: "/photos/but you" }}>PHOTO</Link>
      {" · "}
      <a
        href="https://soundcloud.com/mngyuan/sets/things-i-never-said-to-you-beattape"
        target="_blank"
      >
        MIX
      </a>
      {" · "}
      <Link to={{ pathname: "/stories/oakland just yesterday" }}>STORY</Link>
    </div>
  </div>
);

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
  render() {
    const { history, match, location } = this.props;
    console.log(match.params.set);
    const photoElems = photos[match.params.set].map(src => (
      <img key={src} src={src} />
    ));
    return <Gallery>{photoElems}</Gallery>;
  }
}

class Story extends React.Component {
  render() {
    const { history, match, location } = this.props;
    console.log(match.params.set);
    const photoElems = stories[match.params.set];
    return (
      <div className="story">
        <Gallery>{Stories[match.params.set](photoElems)}</Gallery>
      </div>
    );
  }
}

class Gallery extends React.Component {
  _photowrapperInner;

  _onWheel = e => {
    if (navigator.appVersion.indexOf("Macintosh") === -1) {
      e.preventDefault();
      const node = ReactDOM.findDOMNode(this._photowrapperInner);
      node.scrollLeft += e.deltaY;
    }
  };

  render() {
    return (
      <div className="page">
        <div className="photowrapper">
          <div
            className="photowrapperInner"
            ref={ref => (this._photowrapperInner = ref)}
            onWheel={this._onWheel}
          >
            {this.props.children}
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
    path: "/",
    exact: true,
    sidebar: () => <Sidebar className="black" />,
    main: Landing
  },
  {
    path: "/photos/:set",
    sidebar: ({ match }) => (
      <Sidebar>
        <div className="nav">
          places
          <br />
          <div style={{ textAlign: "right" }}>
            <NavLink to={{ pathname: `/photos/asian` }}>asia </NavLink>
            <br />
            <NavLink to={{ pathname: `/photos/americana` }}>americana </NavLink>
            <br />
            <NavLink to={{ pathname: `/photos/the drive home` }}>
              the drive home{" "}
            </NavLink>
            <br />
            <NavLink to={{ pathname: `/photos/iceland` }}>iceland </NavLink>
          </div>
          <br />
          <br />
          people
          <br />
          <div style={{ textAlign: "right" }}>
            <NavLink to={{ pathname: `/photos/before` }}>before </NavLink>
            <br />
            <NavLink to={{ pathname: `/photos/family` }}>family </NavLink>
            <br />
            <NavLink to={{ pathname: `/photos/but you` }}>but you </NavLink>
          </div>
        </div>
      </Sidebar>
    ),
    main: Photos
  },
  {
    path: "/mix",
    sidebar: () => (
      <Sidebar>
        <div className="theOneDecor" />
      </Sidebar>
    ),
    main: Mix
  },
  {
    path: "/stories/:set",
    sidebar: ({ match }) => (
      <Sidebar>
        <div className="nav">
          <div style={{ textAlign: "right" }}>
            <NavLink to={{ pathname: `/stories/oakland just yesterday` }}>
              oakland, just yesterday
            </NavLink>
            <br />
            <NavLink to={{ pathname: `/stories/ghosts` }}>ghosts</NavLink>
            <br />
          </div>
        </div>
      </Sidebar>
    ),
    main: Story
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      horizontalScroll: true,
      background: "white"
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
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.sidebar}
          />
        ))}
      </div>
    );
  }
}

export default withRouter(App);
