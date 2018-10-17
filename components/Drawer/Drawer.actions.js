import {makeActions} from 'lib/bosque';

export const drawerActions = makeActions(
  'OPEN_DRAWER',
  'CLOSE_DRAWER',
  'TOGGLE_DRAWER'
);
