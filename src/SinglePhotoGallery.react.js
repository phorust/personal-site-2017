import React from 'react';

export default class SinglePhotoGallery extends React.Component {
  _photowrapperInner;

  constructor(props) {
    super(props);
    this.state = {
      curPhoto: 0,
    };
  }

  render() {
    return (
      <div className="page">
        <div className="photowrapper">
          <div
            className="photowrapperInner single"
            ref={ref => (this._photowrapperInner = ref)}
          >
            <div
              class="left"
              onClick={e =>
                this.setState(prevState => ({
                  curPhoto: Math.max(prevState.curPhoto - 1, 0),
                }))
              }
            />
            <div
              class="right"
              onClick={e =>
                this.setState(prevState => ({
                  curPhoto: Math.min(
                    prevState.curPhoto + 1,
                    this.props.photoElems.length - 1,
                  ),
                }))
              }
            />
            {this.props.photoElems[this.state.curPhoto]}
          </div>
          <div className="mobileOnly">
            {this.props.photoElems.map((photoElem, i) => (
              <div key={i}>{photoElem}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
