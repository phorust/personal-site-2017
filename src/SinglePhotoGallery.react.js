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
            onClick={e =>
              e.nativeEvent.clientX >
              this._photowrapperInner.getBoundingClientRect().width / 2
                ? this.setState(prevState => ({
                    curPhoto: Math.min(
                      prevState.curPhoto + 1,
                      this.props.photoElems.length - 1,
                    ),
                  }))
                : this.setState(prevState => ({
                    curPhoto: Math.max(prevState.curPhoto - 1, 0),
                  }))
            }
          >
            {this.props.photoElems[this.state.curPhoto]}
            <div style={{display: 'none'}}>{this.props.photoElems}</div>
          </div>
        </div>
      </div>
    );
  }
}
