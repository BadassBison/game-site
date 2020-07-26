import { Player } from 'src/app/shared/player/player';
import { Box } from './box';
import { Move } from '../interfaces/move';
import { UtilitiesService } from 'src/app/shared/utilities/utilities.service';
import { Cell } from 'src/app/shared/interfaces/cell';
import { Point } from 'src/app/shared/interfaces/point';
import { BoardState } from '../interfaces/board-state';
import { Checker } from './checker';

export class Board {
  static rows = 8;
  static columns = 8;

  state: BoardState;

  static boardBuilder(players: Player[]): Board {
    const state: BoardState = {
      rows: Board.rows,
      columns: Board.columns,
      boxes: new Map<string, Box>(),
      rowColumnMargin: null,
      rowColumnSpacing: null,
      playerOneCheckersRemaining: 12,
      playerTwoCheckersRemaining: 12,
      availableMoves: [],
    };

    if (innerWidth > innerHeight) {
      state.rowColumnSpacing = innerHeight / (state.rows + 2);
      state.rowColumnMargin = (innerWidth - (state.rowColumnSpacing * state.rows)) / 2;
    } else {
      state.rowColumnSpacing = innerWidth / (state.rows + 2);
      state.rowColumnMargin = state.rowColumnSpacing;
    }

    const playerOne: Player = players[0];
    const playerTwo: Player = players[1];

    for (let row = 0; row < state.rows; row++){
      for (let column = 0; column < state.columns; column++) {
        const isOdd: boolean = UtilitiesService.isOdd(row + column);
        const boxIdx: Cell = { row, column };
        const boxPosition: Point = Board.calculateBoxPositions(boxIdx, state.rowColumnSpacing, state.rowColumnMargin);
        const box = Box.boxBuilder(isOdd, boxIdx, boxPosition, state.rowColumnSpacing);

        if (isOdd) {
          if (row < 3) {
            box.buildChecker(playerOne);
          } else if (row > 4) {
            box.buildChecker(playerTwo);
          }
        }
        state.boxes.set(`${row}${column}`, box);
      }
    }
    return new Board(state);
  }

  static calculateBoxPositions(index: Cell, spacing: number, margin: number): Point {
    // const x1 = (Board.columns - index.column) * spacing + margin;
    // const y1 = (Board.rows - index.row) * spacing + margin;
    const x = index.column * spacing + margin;
    const y = index.row * spacing + spacing;
    return { x, y };
  }

  constructor(state: BoardState) {
    this.state = state;
  }

  setupBoardState(players: Player[]) {
    this.state = {
      rows: 8,
      columns: 8,
      boxes: new Map<string, Box>(),
      rowColumnMargin: null,
      rowColumnSpacing: null,
      playerOneCheckersRemaining: 12,
      playerTwoCheckersRemaining: 12,
      availableMoves: null,
    };
    this.setBoxDimensions();
    this.buildBoard(players);
    this.state.availableMoves = [];
  }

  setBoxDimensions() {
    if (innerWidth > innerHeight) {
      this.state.rowColumnSpacing = innerHeight / (this.state.rows + 2);
      this.state.rowColumnMargin = (innerWidth - (this.state.rowColumnSpacing * this.state.rows)) / 2;
    } else {
      this.state.rowColumnSpacing = innerWidth / (this.state.rows + 2);
      this.state.rowColumnMargin = this.state.rowColumnSpacing;
    }
  }

  buildBoard(players: Player[]) {
    const playerOne: Player = players[0];
    const playerTwo: Player = players[1];
    this.state.boxes = new Map<string, Box>();

    for (let row = 0; row < this.state.rows; row++){
      for (let column = 0; column < this.state.columns; column++) {
        const isOdd: boolean = UtilitiesService.isOdd(row + column);
        const boxIdx: Cell = { row, column };
        const boxPosition: Point = this.getBoxPosition(row, column);
        const box = Box.boxBuilder(isOdd, boxIdx, boxPosition, this.state.rowColumnSpacing);

        if (isOdd) {
          if (row < 3) {
            box.buildChecker(playerOne);
          } else if (row > 4) {
            box.buildChecker(playerTwo);
          }
        }
        this.state.boxes.set(`${row}${column}`, box);
      }
    }
  }

  removeCheckerFromBoard(box: Box): void {
    this.decreasePlayersCheckers(box.state.checker as Checker);
    box.removeChecker();
  }

  decreasePlayersCheckers(checker: Checker): void {
    const player = checker.state.player.state.id;

    if (player === 0) {
      this.state.playerOneCheckersRemaining--;
    } else {
      this.state.playerTwoCheckersRemaining--;
    }
  }

  getBox(idx: Cell): Box {
    return this.state.boxes.get(`${idx.row}${idx.column}`);
  }

  getBoxPosition(row: number, column: number): Point {
    const x = column * this.state.rowColumnSpacing + this.state.rowColumnMargin;
    const y = row * this.state.rowColumnSpacing + this.state.rowColumnSpacing;
    return { x, y };
  }

  getBoxIndex(x: number, y: number): Cell {
    const row = Math.floor((y - this.state.rowColumnSpacing) / this.state.rowColumnSpacing);
    const column = Math.floor((x - this.state.rowColumnMargin) / this.state.rowColumnSpacing);
    return { row, column };
  }

  getBoxesArray(): Box[] {
    const boxArray: Box[] = [];
    for (let row = 0; row < this.state.rows; row++) {
      for (let column = 0; column < this.state.columns; column++) {
        boxArray.push(this.state.boxes.get(`${row}${column}`));
      }
    }
    return boxArray;
  }

  resetAvailableMoves(): void {
    this.state.availableMoves = [];
  }

  getAllMoves(box: Box): Box[] {
    const { isKing, player } = (box.state.checker as Checker).state;
    const moves: Box[] = [];
    const { row, column } = box.state.index;

    if (player.state.id === 1 || isKing) {
      if (box.state.index.row > 0 && box.state.index.column > 0) {
        moves.push(this.state.boxes.get(`${row - 1}${column -  1}`));
      }
      if (box.state.index.row > 0 && box.state.index.column < this.state.columns - 1) {
        moves.push(this.state.boxes.get(`${row - 1}${column + 1}`));
      }
    }
    if (player.state.id === 0 || isKing) {
      if (box.state.index.row < this.state.rows - 1 && box.state.index.column > 0) {
        moves.push(this.state.boxes.get(`${row + 1}${column - 1}`));
      }
      if (box.state.index.row < this.state.rows - 1 && box.state.index.column < this.state.columns - 1) {
        moves.push(this.state.boxes.get(`${row + 1}${column + 1}`));
      }
    }

    return moves;
  }

  getAvailableMove(box: Box): Move {
    const idx = this.state.availableMoves.findIndex((move: Move) => {
      return move.end.state.index === box.state.index;
    });
    return this.state.availableMoves[idx];
  }

  setAvailableMoves(box: Box): void {
    const allMoves: Box[] = this.getAllMoves(box);
    this.state.availableMoves = this.filterMoves(box, allMoves);
  }

  filterMoves(startBox: Box, moves: Box[]): Move[] {
    const filteredMoves: Move[] = [];
    const jumpMoves: Move[] = [];
    const { player } = (startBox.state.checker as Checker).state;

    moves.forEach((move: Box) => {

      if (move.hasChecker()) {
        const isOpponentChecker: boolean = this.checkIfOpponentChecker(move, player.state.id);

        if (isOpponentChecker) {
          const isJumpPossible: boolean = this.checkIfJumpIsPossible(startBox.state.index, move.state.index);

          if (isJumpPossible) {
            const jumpIdx: Cell = this.getJumpPosition(startBox.state.index, move.state.index);
            const endBox = this.state.boxes.get(`${jumpIdx.row}${jumpIdx.column}`);
            const jumpMove: Move = { start: startBox, end: endBox, isJump: true, jumpedBox: move };
            jumpMoves.push(jumpMove);
          }
        }
      } else {
        filteredMoves.push({ start: startBox, end: move, isJump: false, jumpedBox: null });
      }
    });

    return jumpMoves.concat(filteredMoves);
  }

  checkIfOpponentChecker(move: Box, player: number): boolean {
    const checker: Checker = (move.state.checker as Checker);
    return player !== checker.state.player.state.id;
  }

  checkIfJumpIsPossible(currentIdx: Cell, moveIdx: Cell): boolean {

    const { row, column }: Cell = this.getJumpPosition(currentIdx, moveIdx);
    if (row < 0 || row >= 8 || column < 0 || column >= 8) { return false; }

    const box: Box = this.state.boxes.get(`${row}${column}`);
    const isBoxEmpty: boolean = !box.hasChecker();
    return isBoxEmpty;
  }

  getJumpPosition(p1: Cell, p2: Cell): Cell {
    const dx = p1.column - p2.column;
    const dy = p1.row - p2.row;
    return { row: p2.row - dy, column: p2.column - dx };
  }

  checkForWin(player: number): boolean {
    if (player === 0) {
      return this.state.playerTwoCheckersRemaining === 0;
    } else {
      return this.state.playerOneCheckersRemaining === 0;
    }
  }

  checkIfKinged(player: number, row: number, checker: Checker) {
    if (player === 0 && row === this.state.rows - 1) {
      checker.makeKing();
    } else if (player === 1 && row === 0) {
      checker.makeKing();
    }
  }

  checkForAdditionalJumps(currentMove: Move): boolean {
    const currentBox: Box = currentMove.end;
    this.setAvailableMoves(currentBox);
    const jumpMoves: Move[] = this.state.availableMoves.filter((move: Move) => {
      return move.isJump;
    });

    if (jumpMoves.length > 0) {
      this.state.availableMoves = jumpMoves;
      this.state.availableMoves.push({start: currentBox, end: currentBox, isJump: false, jumpedBox: null});
      return true;
    }
    return false;
  }

}
