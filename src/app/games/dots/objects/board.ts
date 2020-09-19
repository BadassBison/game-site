import { BoardState } from '../interfaces/board-state';
import { Dot } from './dot';
import { Player } from './player';

export class Board {

  state: BoardState;

  static boardBuilder(rows: number, columns: number, width: number, height: number, players: Player[]): Board {
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
      width,
      height,
      rowSpacing,
      columnSpacing,
      topPadding,
      sidePadding,
      totalSquaresLeft,
      players,
      currentPlayer: players[0],
      startingDot: null,
      endingDot: null,
      currentNeighbors: null
    };
    return new Board(state);
  }

  constructor(state: BoardState) {
    this.state = state;
  }

  handleClick(evt: MouseEvent) {

    if (this.state.startingDot) {
      this.endingMove(evt);
    } else {
      this.startingMove(evt);
    }

    // this.fillSquares();

    // if (this.totalSquaresLeft === 0) this.finishGame();
    // this.drawPlayerBox();
  }

  startingMove(evt: MouseEvent): void {
    const dotWasClicked = this.calculateDotClicked(evt);

    if (dotWasClicked) {
      this.getAvailableNeighbors();
    }
  }

  endingMove(evt: MouseEvent): void {
    const dotWasClicked = this.calculateDotClicked(evt);

    const squareCount = this.state.totalSquaresLeft;

    if (dotWasClicked) {
      this.makeConnections();
      if (squareCount === this.state.totalSquaresLeft) { this.changePlayer(); }
    }
    this.state.startingDot = null;
    this.state.endingDot = null;
  }

  changePlayer() {
    const nextPlayerIdx = (this.state.currentPlayer.state.id + 1) % 2;
    this.state.currentPlayer = this.state.players[nextPlayerIdx];
  }

  calculateDotClicked({ clientX, clientY }: MouseEvent): boolean {

    clientY -= 40;
    const xIdx = Math.floor(clientX / (this.state.width / this.state.columns));
    const yIdx = Math.floor(clientY / (this.state.height / this.state.rows));

    const closestDot = this.state.dots.get(`${xIdx}${yIdx}`);

    if (this.state.startingDot) {

      const hasNeighbor =
      (this.state.currentNeighbors?.north?.state.id  === closestDot.state.id) ||
      (this.state.currentNeighbors?.east ?.state.id  === closestDot.state.id) ||
      (this.state.currentNeighbors?.south?.state.id  === closestDot.state.id) ||
      (this.state.currentNeighbors?.west ?.state.id  === closestDot.state.id);

      if (!hasNeighbor) { return false; }
    }

    const dy = clientY - closestDot.state.y;
    const dx = clientX - closestDot.state.x;

    const distance = Math.sqrt(dy * dy + dx * dx);

    const dotClicked = distance < Math.floor(closestDot.state.radius * 1.5);

    if (dotClicked) {
      const differentDotClicked = this.state.startingDot !== null &&
        this.state.startingDot?.state.id !== closestDot.state.id;

      if (differentDotClicked) {

        this.state.endingDot = closestDot;
        return true;

      } else if (!this.state.startingDot) {

        this.state.startingDot = closestDot;
        return true;
      }
      return false;

    } else {

      this.state.startingDot = null;
      return false;
    }
  }

  private getAvailableNeighbors() {
    const { column, row } = this.state.startingDot.state;
    const { connections } = this.state.startingDot.state;

    let north: Dot;
    if (!connections.north && row > 0) {
      north = this.state.dots.get(`${column}${row - 1}`);
    }

    let east: Dot;
    if (!connections.east  && column < this.state.columns - 1) {
      east = this.state.dots.get(`${column + 1}${row}`);
    }

    let south: Dot;
    if (!connections.south && row < this.state.rows - 1) {
      south = this.state.dots.get(`${column}${row + 1}`);
    }

    let west: Dot;
    if (!connections.west && column > 0) {
      west = this.state.dots.get(`${column - 1}${row}`);
    }

    this.state.currentNeighbors = { north, east, south, west };
  }

  private makeConnections() {
    let direction: string;
    const neighbors = this.state.currentNeighbors;
    if (neighbors.north?.state.id === this.state.endingDot?.state.id) {
      direction = 'north';
      this.state.startingDot.addConnection('north', this.state.endingDot);
      this.state.endingDot.addConnection('south', this.state.startingDot);
    }
    if (neighbors.east?.state.id === this.state.endingDot?.state.id) {
      direction = 'east';
      this.state.startingDot.addConnection('east', this.state.endingDot);
      this.state.endingDot.addConnection('west', this.state.startingDot);
    }
    if (neighbors.south?.state.id === this.state.endingDot?.state.id) {
      direction = 'south';
      this.state.startingDot.addConnection('south', this.state.endingDot);
      this.state.endingDot.addConnection('north', this.state.startingDot);
    }
    if (neighbors.west?.state.id === this.state.endingDot?.state.id) {
      direction = 'west';
      this.state.startingDot.addConnection('west', this.state.endingDot);
      this.state.endingDot.addConnection('east', this.state.startingDot);
    }
    this.detectFullSquare(direction);
  }

  private detectFullSquare(direction: string) {
    if (direction === 'north' || direction === 'south') {
      this.checkLeftSquare(direction);
      this.checkRightSquare(direction);
    } else if (direction === 'west' || direction === 'east') {
      this.checkTopSquare(direction);
      this.checkBottomSquare(direction);
    }
  }

  private checkLeftSquare(direction: 'north' | 'south') {
    if (this.state.startingDot?.state.connections.west && this.state.endingDot?.state.connections.west) {
      const dot = this.state.startingDot.state.connections.west;
      if (dot.state.connections[direction]) {
        if (direction === 'north') {
          if (this.state.currentPlayer.state.id === 0) {
            this.state.players[0].state.squares.push(this.state.endingDot.state.connections.west);
          } else {
            this.state.players[1].state.squares.push(this.state.endingDot.state.connections.west);
          }
        } else {
          if (this.state.currentPlayer.state.id === 0) {
            this.state.players[0].state.squares.push(this.state.startingDot.state.connections.west);
          } else {
            this.state.players[1].state.squares.push(this.state.startingDot.state.connections.west);
          }
        }
        this.state.totalSquaresLeft--;
      }
    }
  }

  private checkRightSquare(direction: 'north' | 'south') {
    if (this.state.startingDot?.state.connections.east && this.state.endingDot?.state.connections.east) {
      const dot = this.state.startingDot.state.connections.east;
      if (dot.state.connections[direction]) {
        if (direction === 'north') {
          if (this.state.currentPlayer.state.id === 0) {
            this.state.players[0].state.squares.push(this.state.endingDot);
          } else {
            this.state.players[1].state.squares.push(this.state.endingDot);
          }
        } else {
          if (this.state.currentPlayer.state.id === 0) {
            this.state.players[0].state.squares.push(this.state.startingDot);
          } else {
            this.state.players[1].state.squares.push(this.state.startingDot);
          }
        }
        this.state.totalSquaresLeft--;
      }
    }
  }

  private checkTopSquare(direction: 'west' | 'east') {
    if (this.state.startingDot?.state.connections.north && this.state.endingDot?.state.connections.north) {
      const dot = this.state.startingDot.state.connections.north;
      if (dot.state.connections[direction]) {
        if (direction === 'west') {
          if (this.state.currentPlayer.state.id === 0) {
            this.state.players[0].state.squares.push(this.state.endingDot.state.connections.north);
          } else {
            this.state.players[1].state.squares.push(this.state.endingDot.state.connections.north);
          }
        } else {
          if (this.state.currentPlayer.state.id === 0) {
            this.state.players[0].state.squares.push(this.state.startingDot.state.connections.north);
          } else {
            this.state.players[1].state.squares.push(this.state.startingDot.state.connections.north);
          }
        }
        this.state.totalSquaresLeft--;
      }
    }
  }

  private checkBottomSquare(direction: 'west' | 'east') {
    if (this.state.startingDot?.state.connections.south && this.state.endingDot?.state.connections.south) {
      const dot = this.state.startingDot.state.connections.south;
      if (dot.state.connections[direction]) {
        if (direction === 'west') {
          if (this.state.currentPlayer.state.id === 0) {
            this.state.players[0].state.squares.push(this.state.endingDot);
          } else {
            this.state.players[1].state.squares.push(this.state.endingDot);
          }
        } else {
          if (this.state.currentPlayer.state.id === 0) {
            this.state.players[0].state.squares.push(this.state.startingDot);
          } else {
            this.state.players[1].state.squares.push(this.state.startingDot);
          }
        }
        this.state.totalSquaresLeft--;
      }
    }
  }

}
