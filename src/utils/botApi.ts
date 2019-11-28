import * as b from 'robotjs';
import { isSimilarColor } from './helpers';
import { LEFT_CLICK, WaitMs, MouseButtonState } from '../constants';
import { msleep } from 'sleep';
import { KeyModifier } from '../types/general';

export const bot = {
  move(x: number, y: number) {
    b.moveMouse(x, y);
    return this;
  },

  click(x?: number, y?: number) {
    if (x && y) {
      this.move(x, y);
      b.mouseClick(LEFT_CLICK);
    }
    return this;
  },

  clickIfSimilarColor(x: number, y: number, color: string) {
    const colorXY = b.getPixelColor(x, y);

    if (isSimilarColor(color, colorXY)) {
      this.click(x, y);
    }

    return this;
  },

  pxl(x?: number, y?: number) {
    if (x && y) {
      return b.getPixelColor(x, y);
    }

    const mousePosition = b.getMousePos();

    return b.getPixelColor(
      mousePosition.x,
      mousePosition.y,
    );
  },

  waitMs(ms: number) {
    msleep(ms);
    return this;
  },

  waitMin() {
    msleep(WaitMs.min);
    return this;
  },

  swipeX(startX: number, startY: number, finishX: number) {
    this.move(startX, startY)
      .click(startX, startY)
      .waitMin()
    b.mouseToggle(MouseButtonState.down);

    this.waitMin().move(finishX, startY).waitMin();

    b.mouseToggle(MouseButtonState.up);

    return this;
  },

  includesColor(compireColor: string, colors: string[]) {
    return colors.find(color => isSimilarColor(color, compireColor));
  },

  press(btn: string, modifier?: KeyModifier[]) {
    b.keyTap(btn, modifier);
    
    return this;
  },

  typeString(str: string) {
    b.typeString(str);

    return this;
  }

};
