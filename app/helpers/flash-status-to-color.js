import {helper} from '@ember/component/helper';

export function flashStatusToColor([status] /*, hash*/) {
  switch (status) {
    case 'Success':
      return 'green';
    case 'Danger':
      return 'red';
    default:
      return 'blue';
  }
}

export default helper(flashStatusToColor);
