import _ from 'lodash';
import { cube } from './math.js';
import Print from './print';

if (process.env.NODE_ENV !== 'production') {
  console.log(process.env.NODE_ENV)
  console.log('Looks like we are in development mode!');
}

function component() {
  var element = document.createElement('div');
  var element = document.createElement('pre');

  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n');
  element.onclick = Print.bind(null, 'Hello webpack!');

  return element;
}

document.body.appendChild(component());
