import React from 'react';

let Terminal = React.createClass({
  render() {
    return (
      <div id='term_content'>
        <div id='term'>
          <div id='appbar'>
            <div id='close'></div>
            <div id='minimize'></div>
            <div id='maximize'></div>
          </div>
          <div id='output'>
            <div id='textarea'></div>
            <div id='lastline'>
              <span className='prompt_path'>~</span> <span className='prompt_arrow'>&#x2192;</span><input type='text' />
            </div>
          </div>
        </div>
        <p>Try your favorite terminal commands, or just go <a id="term-project-link">straight to the projects.</a></p>
      </div>
    );
  }
});

export default Terminal;
