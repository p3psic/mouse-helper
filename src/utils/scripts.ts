import { bot } from './botApi';
import { WaitMs } from '../constants';
import { screen } from 'electron';
import { clipPositionAndColor } from './helpers';

const RESUOURCE_RECYCLE_LINE = [1106, 482];
const TIME_RECYCLE_6DAYS_LINE = [1071, 758];

export const runStronghold6d = () => {
  console.log('cita 6d')
  const mouse = screen.getCursorScreenPoint();

  bot.move(...RESUOURCE_RECYCLE_LINE);
  bot.dblClick(...RESUOURCE_RECYCLE_LINE).waitMs(WaitMs.basic).typeString('5555');

  bot.dblClick(...TIME_RECYCLE_6DAYS_LINE).waitMs(WaitMs.basic);

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
    bot.waitForColor(,);
    `
  );

  bot.move(mouseCoordinates.x, mouseCoordinates.y);

  return false;
};
