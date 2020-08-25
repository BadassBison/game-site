import { Box } from '../objects/box';

export interface Move {

  /**
   * The starting box object where a move originates
   */
  start: Box;

  /**
   * The ending box object where a move ends
   */
  end: Box;

  /**
   * Whether the move was a jump
   */
  isJump: boolean;

  /**
   * The jumped box object
   */
  jumpedBox: Box;
}
