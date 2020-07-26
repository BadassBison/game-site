import { Box } from '../objects/box';
import { Move } from '../interfaces/move';

export interface BoardState {
  rows: number;
  columns: number;
  boxes: Map<string, Box>;
  rowColumnMargin: number;
  rowColumnSpacing: number;
  playerOneCheckersRemaining: number;
  playerTwoCheckersRemaining: number;
  availableMoves: Move[];
}
