import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ConnectionGraph } from './interfaces/connectionGraph';
// import { Dot } from './objects/dot';
// import { ConnectionGraph } from './interfaces/connectionGraph';
import { Board } from './objects/board';
import { Dot } from './objects/dot';

@Component({
  selector: 'app-dots',
  templateUrl: './dots.component.html',
  styleUrls: ['./dots.component.scss'],
})
export class DotsComponent implements OnInit, AfterViewInit {

  @ViewChild('dots', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  board: Board;
  rows = 8;
  columns = 8;

  neighbors: ConnectionGraph;
  hightlightRadius: number;

  playerOneSquares: Dot[];
  playerTwoSquares: Dot[];
  // player = 0;
  playerColors: string[] = ['blue', 'red'];

  constructor() {}

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.setCanvasDimensions();
    this.board = Board.boardBuilder(this.rows, this.columns, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.draw();
  }

  setCanvasDimensions(): void {
    this.canvas.nativeElement.width = innerWidth;
    this.canvas.nativeElement.height = innerHeight - 40;
  }

  handleClick(evt: MouseEvent): void {
    console.log({ evt });
  }

  // Drawing

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  draw() {
    this.clearCanvas();
    this.drawDots(this.board.state.dots);
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
    this.ctx.fillStyle = this.playerColors[player];
    this.ctx.fillRect(dot.state.x, dot.state.y, this.board.state.columnSpacing, this.board.state.rowSpacing);
    this.ctx.fillStyle = 'black';
  }

  fillSquares() {
    this.playerOneSquares.forEach(point => {
      this.fillSquare(point, 0);
    });
    this.playerTwoSquares.forEach(point => {
      this.fillSquare(point, 1);
    });
  }

  highlightClickedDot() {
    this.drawDot(this.board.state.startingDot, true);
  }

  highlightNeighbors() {

    const { north, east, south, west } = this.neighbors;

    this.ctx.strokeStyle = 'goldenrod';
    this.ctx.beginPath();
    if (north) {
      this.ctx.arc(north.state.x, north.state.y, this.hightlightRadius, 0, Math.PI * 2, true);
    }
    if (east) {
      this.ctx.moveTo(east.state.x + this.hightlightRadius, east.state.y);
      this.ctx.arc(east.state.x, east.state.y, this.hightlightRadius, 0, Math.PI * 2, true);
    }
    if (south) {
      this.ctx.moveTo(south.state.x + this.hightlightRadius, south.state.y);
      this.ctx.arc(south.state.x, south.state.y, this.hightlightRadius, 0, Math.PI * 2, true);
    }
    if (west) {
      this.ctx.moveTo(west.state.x + this.hightlightRadius, west.state.y);
      this.ctx.arc(west.state.x, west.state.y, this.hightlightRadius, 0, Math.PI * 2, true);
    }
    this.ctx.stroke();
  }

}
