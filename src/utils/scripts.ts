import { bot } from './botApi';
import { WaitMs } from '../constants';
import { screen } from 'electron';
import { clipPositionAndColor } from './helpers';

const recycleLineGameRoom = [1106, 482];
const TIME_RECYCLE_6DAYS_LINE = [1071, 758];

const resourceLinePlarPlay = [1100, 480];
const recycleLinePlarPlay6d = [1080, 765];
const recycleLinePlarPlay3d = [1127, 765];

export const runStronghold6d = () => {
  console.log('cita 6d')
  const mouse = screen.getCursorScreenPoint();

  bot.move(...recycleLineGameRoom);
  bot.dblClick(...recycleLineGameRoom).waitMs(WaitMs.basic).typeString('5555');

  bot.dblClick(...TIME_RECYCLE_6DAYS_LINE).waitMs(WaitMs.basic);

  bot.move(mouse.x, mouse.y)
    .waitMs(WaitMs.basic);

  return false;
};

export const runStronghold6dPP = () => {
  console.log('cita 6d')
  const mouse = screen.getCursorScreenPoint();
  

  bot.move(...resourceLinePlarPlay);
  bot.dblClick(...resourceLinePlarPlay).waitMs(WaitMs.basic).typeString('5555');

  bot.dblClick(...recycleLinePlarPlay6d).waitMs(WaitMs.basic);

  bot.move(mouse.x, mouse.y)
    .waitMs(WaitMs.basic);

  return false;
};

export const runStronghold3dPP = () => {
  console.log('cita 3d')
  const mouse = screen.getCursorScreenPoint();

  bot.move(...resourceLinePlarPlay);
  bot.dblClick(...resourceLinePlarPlay).waitMs(WaitMs.basic).typeString('5555');

  bot.dblClick(...recycleLinePlarPlay3d).waitMs(WaitMs.basic);

  bot.move(mouse.x, mouse.y)
    .waitMs(WaitMs.basic);

  return false;
};

export const copyMousePosAndPxlColor = () => {
  const mouseCoordinates = screen.getCursorScreenPoint();
  const clickCode = `bot.click(${mouseCoordinates.x}, ${mouseCoordinates.y});`;
  const activeColor = bot.pxl();

  bot.animateMove(0, 0);

  const unactiveColor = bot.pxl(mouseCoordinates.x, mouseCoordinates.y);

  clipPositionAndColor(
    `
    ${clickCode} // ['${activeColor}','${unactiveColor}']
    bot.waitForColor(${mouseCoordinates.x}, ${mouseCoordinates.y}, ['${activeColor}','${unactiveColor}']);
    `
  );

  bot.move(mouseCoordinates.x, mouseCoordinates.y);

  return false;
};

const INVDER_DELAY = 500;
let PAUSED_INVIDER_ATTACK = false;
let inviderTimerId: NodeJS.Timeout;

const attackInvider = (): void => {
  if (!PAUSED_INVIDER_ATTACK) return;
  // gameroom
  bot.clickIfSimilarColor(775, 808, ['a4080b', '730408']);
};

export const runInviderAttack = (): void => {
  PAUSED_INVIDER_ATTACK = !PAUSED_INVIDER_ATTACK;

  if (inviderTimerId) clearInterval(inviderTimerId);
  inviderTimerId = setInterval(attackInvider, INVDER_DELAY);
}
