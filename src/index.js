import _ from 'lodash';

function component() {
  const element = document.createElement('div');
  const button = document.createElement('button');
  const button2 = document.createElement('button');
  const br = document.createElement('br');

  button.innerHTML = 'Click me and look at the console!';
  button2.innerHTML = '2Click me and look at the console!';
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.appendChild(br);
  element.appendChild(button);
  element.appendChild(button2);

  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    const print = module.default;

    print();
  });
  button2.onclick = e => import(/* webpackChunkName: "print2" */ './print2').then(module => {
    const print2 = module.default;

    print2();
  });

  return element;
}

document.body.appendChild(component());