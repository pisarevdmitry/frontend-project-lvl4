import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import React from 'react';
import { render } from 'react-dom';
import init from './App.jsx';

const App = init();

render(
  <App />,
  document.getElementById('chat'),
);
