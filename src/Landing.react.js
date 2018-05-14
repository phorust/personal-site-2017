import React from 'react';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showHider: true};
  }

  componentDidMount() {
    setTimeout(() => this.setState({showHider: false}), 5000);
  }

  render() {
    const {showHider} = this.state;
    const hider = showHider ? <div id="hider" /> : null;
    return (
      <div className="page black">
        <iframe
          src="https://player.vimeo.com/video/213032482?autoplay=1"
          width="720"
          height="480"
          frameBorder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowFullScreen
          title="Japan Travel Video"
        />
        {hider}
      </div>
    );
  }
}

export default Landing;
