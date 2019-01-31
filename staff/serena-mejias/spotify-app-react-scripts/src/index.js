import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api-1.0.0';

spotifyApi.token =
  "BQCRMqIHJ1ke-C-0GEe2vNc09BfYpWNh5FkR8mjf7J43FJZKkm5tbnEnxCfeLNZ8CsIWF68WwYmdQrcZmO9J7dgABw4amYCwg0uJmmgRYsa4LSzrBY49uhM2WPf35_xFDi35g_xS4a2GBOxYF01n";

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
