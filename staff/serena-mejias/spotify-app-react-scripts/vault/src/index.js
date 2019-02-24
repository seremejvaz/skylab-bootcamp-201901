import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api';

spotifyApi.token =
  "BQCnwevd-wyVcY34z_5Q8CBzGwLaw8eB2i6efoJNNA19Jgp-JDynyHAZ5kozDy5bVCT49rk4KBHKDUd4_M1hr578JYmYH28eh_NHGMEFyTJMfIEvKyCXCb4rgjH5gyDmcvWjUnKfVdq-zKJm_9nv";

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
