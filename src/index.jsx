import '../assets/application.scss';
import { render } from 'react-dom';
import init from './App.jsx';

const vdom = init();

render(
  vdom,
  document.getElementById('chat'),
);
