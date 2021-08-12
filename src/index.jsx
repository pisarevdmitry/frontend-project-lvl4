import React from 'react';
import { render } from 'react-dom';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import App from './App.jsx';

render(<App />, document.getElementById('chat'));
