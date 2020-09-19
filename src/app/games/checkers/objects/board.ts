import { BoardState } from '../interfaces/board-state';
import { Box } from './box';
import { Move } from '../interfaces/move';
import { Player } from './player';
import { Cell } from 'src/app/shared/interfaces/cell';
import { Point } from 'src/app/shared/interfaces/point';
import { IPosition } from 'src/app/shared/interfaces/position';

import { Checker } from './checker';

import { UtilitiesService } from 'src/app/shared/utilities/utilities.service';

export class Board {
  static rows = 8;
  static columns = 8;
  static boxSize: number;

  state: BoardState;

  static boardBuilder(players: Player[]): Board {
    Board.boxSize = Board.calculateBoxSize();
    const topPadding = Board.calculateTopPadding();
    const sidePadding = Board.calculateSidePadding();

    const state: BoardState = {
      rows: Board.rows,
      columns: Board.columns,
      boxes: new Map<string, Box>(),
      topPadding,
      sidePadding,
      playerOneCheckersRemaining: 12,
      playerTwoCheckersRemaining: 12,
      availableMoves: [],
    };

    const playerOne: Player = players[0];
    const playerTwo: Player = players[1];

    for (let row = 0; row < state.rows; row++){
      for (let column = 0; column < state.columns; column++) {
        const isOdd: boolean = UtilitiesService.isOdd(row + column);
        const boxCell: Cell = { row, column };
        const boxPoint: Point = Board.calculateBoxPositions(boxCell, state.topPadding, state.sidePadding);
        const boxPosition: IPosition = { cell: boxCell, point: boxPoint };
        const box: Box = Box.boxBuilder(isOdd, boxPosition, Board.boxSize);

        if (isOdd) {
          if (row < 3) {
            box.buildChecker(playerTwo);
          } else if (row > 4) {
            box.buildChecker(playerOne);
          }
        }
        state.boxes.set(`${row}${column}`, box);
      }
    }
    return new Board(state);
  }

  static calculateBoxPositions(index: Cell, topPadding: number, sidePadding: number): Point {
    const x = index.column * Board.boxSize + sidePadding;
    const y = index.row * Board.boxSize + topPadding;
    return { x, y };
  }

  static calculateBoxSize(): number {
    if (innerWidth > innerHeight) {
      return innerHeight / (Board.rows + 2);
    } else {
      return innerWidth / (Board.rows + 2);
    }
  }

  static calculateTopPadding(): number {
    if (innerWidth > innerHeight) {
      return Board.boxSize - 20;
    } else {
      const boardSize = Board.boxSize * 8;
      return (innerHeight - boardSize) / 2 - 20;
    }
  }

  static calculateSidePadding(): number {
    if (innerWidth > innerHeight) {
      const boardSize = Board.boxSize * 8;
      return (innerWidth - boardSize) / 2;
    } else {
      return Board.boxSize;
    }
  }

  constructor(state: BoardState) {
    this.state = state;
  }

  setupBoardState(players: Player[]): void {
    this.state = {
      rows: 8,
      columns: 8,
      boxes: new Map<string, Box>(),
      topPadding: null,
      sidePadding: null,
      playerOneCheckersRemaining: 12,
      playerTwoCheckersRemaining: 12,
      availableMoves: null,
    };

    this.buildBoard(players);
    this.state.availableMoves = [];
  }

  buildBoard(players: Player[]) {
    const playerOne: Player = players[0];
    const playerTwo: Player = players[1];
    this.state.boxes = new Map<string, Box>();

    for (let row = 0; row < this.state.rows; row++){
      for (let column = 0; column < this.state.columns; column++) {
        const isOdd: boolean = UtilitiesService.isOdd(row + column);
        const boxCell: Cell = { row, column };
        const boxPoint: Point = this.getBoxPosition(row, column);
        const boxPosition: IPosition = { cell: boxCell, point: boxPoint };
        const box = Box.boxBuilder(isOdd, boxPosition, Board.boxSize);

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
    const x = column * Board.boxSize + this.state.sidePadding;
    const y = row * Board.boxSize + this.state.topPadding;
    return { x, y };
  }

  getBoxIndex(x: number, y: number): Cell {
    const row = Math.floor((y - this.state.topPadding - 40) / Board.boxSize);
    const column = Math.floor((x - this.state.sidePadding) / Board.boxSize);
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
    const { row, column } = box.state.position.cell;

    if (row > 0 && column > 0) {
      moves.push(this.state.boxes.get(`${row - 1}${column -  1}`));
    }
    if (row > 0 && column < this.state.columns - 1) {
      moves.push(this.state.boxes.get(`${row - 1}${column + 1}`));
    }

    if (isKing) {
      if (row < this.state.rows - 1 && column > 0) {
        moves.push(this.state.boxes.get(`${row + 1}${column - 1}`));
      }
      if (row < this.state.rows - 1 && column < this.state.columns - 1) {
        moves.push(this.state.boxes.get(`${row + 1}${column + 1}`));
      }
    }

    return moves;
  }

  getAvailableMove(box: Box): Move {
    const idx = this.state.availableMoves.findIndex((move: Move) => {
      return move.end.state.position.cell === box.state.position.cell;
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
          const isJumpPossible: boolean = this.checkIfJumpIsPossible(startBox.state.position.cell, move.state.position.cell);

          if (isJumpPossible) {
            const jumpIdx: Cell = this.getJumpPosition(startBox.state.position.cell, move.state.position.cell);
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

  checkIfKinged(row: number, checker: Checker) {
    if (row === 0) {
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
