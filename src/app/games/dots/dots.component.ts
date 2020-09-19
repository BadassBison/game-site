import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Board } from './objects/board';
import { Dot } from './objects/dot';
import { Player } from './objects/player';

@Component({
  selector: 'app-dots',
  templateUrl: './dots.component.html',
  styleUrls: ['./dots.component.scss'],
})
export class DotsComponent implements AfterViewInit {

  @ViewChild('dots', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  ctx: CanvasRenderingContext2D;
  board: Board;
  rows = 8;
  columns = 8;
  highlightRadius = 16;

  constructor() {}

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.setCanvasDimensions();
    this.board = Board.boardBuilder(
      this.rows,
      this.columns,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height,
      this.buildPlayers()
    );
    this.draw();
  }

  setCanvasDimensions(): void {
    this.canvas.nativeElement.width = innerWidth;
    this.canvas.nativeElement.height = innerHeight - 40;
  }

  buildPlayers(): Player[] {
    const playerOne: Player = Player.playerBuilder(1, 'blue');
    const playerTwo: Player = Player.playerBuilder(2, 'red');
    return [playerOne, playerTwo];
  }

  handleClick(evt: MouseEvent): void {
    this.board.handleClick(evt);
    if (this.board.state.startingDot) {
      this.highlightClickedDot();
      this.highlightNeighbors();
    } else {
      this.draw();
    }

  }



  // Drawing

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  drawPlayerBorder() {
    this.ctx.strokeStyle = this.board.state.currentPlayer.state.color;
    this.ctx.lineWidth = 30;
    this.ctx.strokeRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  draw() {
    this.clearCanvas();
    this.drawPlayerBorder();
    this.drawDots(this.board.state.dots);
    this.fillSquares();
  }

  drawDots(dots: Map<string, Dot>) {
    dots.forEach(dot => {
      this.drawDot(dot, false);
      this.drawConnections(dot);
    });
  }

  drawDot(dot: Dot, highlight: boolean) {
    if (highlight) {
      this.ctx.fillStyle = 'pink';
    } else {
      this.ctx.fillStyle = 'black';
    }

    this.ctx.beginPath();
    this.ctx.arc(dot.state.x, dot.state.y, dot.state.radius, 0, Math.PI * 2, true);
    this.ctx.fill();
  }

  drawConnections(dot: Dot) {
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

  fillSquare(dot: Dot, player: number) {
    this.ctx.fillStyle = this.board.state.players[player].state.color;
    this.ctx.fillRect(dot.state.x, dot.state.y, this.board.state.columnSpacing, this.board.state.rowSpacing);
  }

  fillSquares() {
    this.board.state.players[0].state.squares.forEach(point => {
      this.fillSquare(point, 0);
    });
    this.board.state.players[1].state.squares.forEach(point => {
      this.fillSquare(point, 1);
    });
  }

  highlightClickedDot() {
    this.drawDot(this.board.state.startingDot, true);
  }

  highlightNeighbors() {

    const { north, east, south, west } = this.board.state.currentNeighbors;

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
