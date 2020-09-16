import { Dot } from '../objects/dot';

export interface BoardState {
  dots: Map<string, Dot>;
  rows: number;
  columns: number;
  rowSpacing: number;
  columnSpacing: number;
  topPadding: number;
  sidePadding: number;
  startingDot: Dot;
  endingDot: Dot;
  totalSquaresLeft: number;
}
