import '../assets/application.scss';
import { render } from 'react-dom';
import init from './init.jsx';

const vdom = init();

render(
  vdom,
  document.getElementById('chat'),
);
