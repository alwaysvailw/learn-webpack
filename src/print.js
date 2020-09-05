import _ from 'lodash';
import moment from 'moment';

export default function printMe() {
  console.log('I get called from print.js!');
  console.log(moment())
  let a = _.join(['Hello', 'webpack'], ' ');
}