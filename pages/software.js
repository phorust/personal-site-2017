import React, { Component } from 'react';
import '../components/term.scss';

export default class extends Component {

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
              <span class='prompt_path'>~</span> <span class='prompt_arrow'>&#x2192;</span><input type='text' />
            </div>
          </div>
        </div>
        <p>Try your favorite terminal commands, or just go <a id="term-project-link">straight to the projects.</a></p>
      </div>
    );
  }

}
