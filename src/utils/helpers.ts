import { clipboard } from 'electron';

export const isSimilarColor = (color1: string, color2: string) => (
  getDiffHex(color1[0], color2[0]) < 3 &&
  getDiffHex(color1[2], color2[2]) < 3 &&
  getDiffHex(color1[4], color2[4]) < 3
);

const getDiffHex = (c1: string, c2: string) => Math.abs(parseInt(c1, 16) - parseInt(c2, 16));

export const clipPositionAndColor = (txt: string) => {
  clipboard.writeText(txt);
}
