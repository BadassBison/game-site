import { Box } from '../objects/box';

export interface Move {
  start: Box;
  end: Box;
  isJump: boolean;
  jumpedBox: Box;
}
