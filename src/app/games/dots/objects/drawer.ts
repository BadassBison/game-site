import { Board } from './board';
import { Dot } from './dot';
import { Player } from './player';

export class Drawer {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  highlightRadius = 16;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }

  draw(board: Board, renderAll: boolean) {
    if (renderAll) {
      this.clearCanvas();
      this.drawPlayerBorder(board);
      this.drawDots(board.state.dots);
      this.fillSquares(board);
    } else {
      this.highlightDots(board);
    }
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }

  private highlightDots(board: Board) {
    this.highlightClickedDot(board.state.startingDot);
    this.highlightNeighbors(board);
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawPlayerBorder(board: Board) {
    this.ctx.strokeStyle = board.state.currentPlayer.state.color;
    this.ctx.lineWidth = 30;
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawDots(dots: Map<string, Dot>) {
    dots.forEach(dot => {
      this.drawDot(dot, false);
      this.drawConnections(dot);
    });
  }

  private drawDot(dot: Dot, highlight: boolean) {
    if (highlight) {
      this.ctx.fillStyle = 'pink';
    } else {
      this.ctx.fillStyle = 'black';
    }

    this.ctx.beginPath();
    this.ctx.arc(dot.state.x, dot.state.y, dot.state.radius, 0, Math.PI * 2, true);
    this.ctx.fill();
  }

  private drawConnections(dot: Dot) {
    const { north, east, south, west } = dot.state.connections;

    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 6;
    this.ctx.beginPath();
    this.ctx.moveTo(dot.state.x, dot.state.y);
    if (north) {
      this.ctx.lineTo(north.state.x, north.state.y);
      this.ctx.moveTo(dot.state.x, dot.state.y);
    }
    if (east) {
      this.ctx.lineTo(east.state.x, east.state.y);
      this.ctx.moveTo(dot.state.x, dot.state.y);
    }
    if (south) {
      this.ctx.lineTo(south.state.x, south.state.y);
      this.ctx.moveTo(dot.state.x, dot.state.y);
    }
    if (west) {
      this.ctx.lineTo(west.state.x, west.state.y);
    }
    this.ctx.stroke();
  }

  private fillSquare(dot: Dot, player: Player, columnSpacing: number, rowSpacing: number) {
    this.ctx.fillStyle = player.state.color;
    this.ctx.fillRect(dot.state.x, dot.state.y, columnSpacing, rowSpacing);
  }

  private fillSquares(board: Board) {
    const columnSpacing = board.state.columnSpacing;
    const rowSpacing = board.state.rowSpacing;

    const playerOne = board.state.players[0];
    playerOne.state.squares.forEach(dot => {
      this.fillSquare(dot, playerOne, columnSpacing, rowSpacing);
    });

    const playerTwo = board.state.players[1];
    board.state.players[1].state.squares.forEach(dot => {
      this.fillSquare(dot, playerTwo, columnSpacing, rowSpacing);
    });
  }

  private highlightClickedDot(dot: Dot) {
    this.drawDot(dot, true);
  }

  private highlightNeighbors(board: Board) {

    const { north, east, south, west } = board.state.currentNeighbors;

    this.ctx.strokeStyle = 'goldenrod';
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    if (north) {
      this.ctx.arc(north.state.x, north.state.y, this.highlightRadius, 0, Math.PI * 2, true);
    }
    if (east) {
      this.ctx.moveTo(east.state.x + this.highlightRadius, east.state.y);
      this.ctx.arc(east.state.x, east.state.y, this.highlightRadius, 0, Math.PI * 2, true);
    }
    if (south) {
      this.ctx.moveTo(south.state.x + this.highlightRadius, south.state.y);
      this.ctx.arc(south.state.x, south.state.y, this.highlightRadius, 0, Math.PI * 2, true);
    }
    if (west) {
      this.ctx.moveTo(west.state.x + this.highlightRadius, west.state.y);
      this.ctx.arc(west.state.x, west.state.y, this.highlightRadius, 0, Math.PI * 2, true);
    }
    this.ctx.stroke();
  }

}
