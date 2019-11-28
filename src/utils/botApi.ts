import * as b from 'robotjs';
import { isSimilarColor } from './helpers';
import { LEFT_CLICK, WaitMs, MouseButtonState } from '../constants';
import { msleep } from 'sleep';
import { KeyModifier } from '../types/general';
import { screen } from 'electron';

export const bot = {
  animate: 0,
  move(x?: number, y?: number) {
    x && y && b.moveMouse(x, y);

    return this;
  },
  
  animateMove(x: number, y: number) {
    const start = Date.now();
    const mouse = screen.getCursorScreenPoint();

    const anim = () => {
      const time = Date.now() - start;
      const et = 300;
      const progress = 1 - time / 300;

      if (time < et) {
        bot.move(
          ~~(Math.abs(x - mouse.x) * progress),
          ~~(Math.abs(y - mouse.y) * progress),
        )
        bot.waitMs(2);
        anim();
      }
    };

    anim();
  },

  dblClick(x?: number, y?: number) {
    if (x && y) {
      this.move(x, y);
      b.mouseClick(LEFT_CLICK, true);
    }

    return this;
  },

  click(x?: number, y?: number) {
    if (x && y) {
      this.move(x, y);
      b.mouseClick(LEFT_CLICK);
    }

    return this;
  },

  clickIfSimilarColor(x: number, y: number, color: string[] | string) {
    const pxlColorUnderMouse = b.getPixelColor(x, y);

    if (Array.isArray(color)) {
      const hasColor = color.find(color => isSimilarColor(color, pxlColorUnderMouse));
      hasColor && this.click(x, y);
    } else if (isSimilarColor(color, pxlColorUnderMouse)) {
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
