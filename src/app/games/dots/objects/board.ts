import { BoardState } from '../interfaces/board-state';
import { Dot } from './dot';

export class Board {

  state: BoardState;

  static boardBuilder(rows: number, columns: number, width: number, height: number): Board {
    const rowSpacing = height / rows;
    const columnSpacing = width / columns;
    const topPadding = rowSpacing / 2;
    const sidePadding = columnSpacing / 2;

    const dots = new Map<string, Dot>();

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns ; column++) {
        const x = column * columnSpacing + sidePadding;
        const y = row * rowSpacing + topPadding;

        const dot = Dot.dotBuilder(x, y, column, row);
        dots.set(`${column}${row}`, dot);
      }
    }

    const totalSquaresLeft = (rows - 1) * (columns - 1);

    const state: BoardState = {
      dots,
      rows,
      columns,
      rowSpacing,
      columnSpacing,
      topPadding,
      sidePadding,
      totalSquaresLeft,
      startingDot: null,
      endingDot: null
    };
    return new Board(state);
  }

  constructor(state: BoardState) {
    this.state = state;
  }
}
