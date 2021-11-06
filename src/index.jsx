/* eslint-disable  */
import '../assets/application.scss';
import { render } from 'react-dom';
import init from './init.jsx';

init().then((vdom) => {
  render(
    vdom,
    document.getElementById('chat'),
  );
});
