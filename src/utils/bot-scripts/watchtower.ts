import { bot } from '../botApi';
import { VikHotKeys, WaitMs } from '../../constants';

const WT_ENTITS_DD_HIEGHT = 25;
const WT_ETITIES_DROPDOWN = [550, 450];
// const WT_LEVELS_DROPDOWN = [0, 0];
const WT_DD_COLOR = ['221f19', '25201c'];
// const ACTION_BUTTON_COLOR = ['b50c10','7b0810'];

enum ENTITY_LIST {
  town = 0,
  farmlands = 1,
  goldFields = 2,
  goldOfTheGods = 3,
  ironDeposits = 4,
  silverAltar = 5,
  hewersCamp = 6,
  lumberjacksShed = 7,
  inviders = 8,
  invidersLair = 9,
  ghost = 10,
  ghostsShelter = 11,
};

export const openWatchtower = () => {
  console.log('start')
  bot.waitMs(1000);
  console.log('www')
  bot.press(VikHotKeys.watchtower);

  bot.waitForColor(
    WT_ETITIES_DROPDOWN[0],
    WT_ETITIES_DROPDOWN[1],
    WT_DD_COLOR
  );

  bot.click(...WT_ETITIES_DROPDOWN).waitMs(WaitMs.basic);
  
  bot.click(
    WT_ETITIES_DROPDOWN[0],
    WT_ETITIES_DROPDOWN[1] + ENTITY_LIST.farmlands * WT_ENTITS_DD_HIEGHT
  );

  console.log('end')
};
