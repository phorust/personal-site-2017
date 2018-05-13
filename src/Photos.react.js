import React from 'react';
import ReactDOM from 'react-dom';

const importAll = r => r.keys().map(r);

const photos = {
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
  'not for me': importAll(
    require.context('./photos2/not for me', false, /\.(png|jpe?g|svg)$/),
  ),
  'but you': importAll(
    require.context('./photos2/you', false, /\.(png|jpe?g|svg)$/),
  ),
};

export class Gallery extends React.Component {
  _photowrapperInner;

  _onWheel = e => {
    if (navigator.appVersion.indexOf('Macintosh') === -1) {
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

const Photos = props => {
  const {match} = props;
  console.log(match.params.set);
  const photoElems = photos[match.params.set].map(src => (
    <img key={src} src={src} />
  ));
  return <Gallery>{photoElems}</Gallery>;
};

export default Photos;
