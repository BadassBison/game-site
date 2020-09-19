import { Player } from '../objects/player';
import { Dot } from '../objects/dot';
import { ConnectionGraph } from './connectionGraph';

export interface BoardState {
  dots: Map<string, Dot>;
  rows: number;
  columns: number;
  width: number;
  height: number;
  rowSpacing: number;
  columnSpacing: number;
  topPadding: number;
  sidePadding: number;
  startingDot: Dot;
  endingDot: Dot;
  players: Player[];
  currentPlayer: Player;
  totalSquaresLeft: number;
  currentNeighbors: ConnectionGraph;
}
