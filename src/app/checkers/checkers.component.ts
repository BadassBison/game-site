import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Board } from './objects/board';
import { Player } from '../shared/player/player';
import { Checker } from './objects/checker';
import { Box } from './objects/box';
import { Move } from './interfaces/move';
import { Point } from '../shared/interfaces/point';

@Component({
  selector: 'app-checkers',
  templateUrl: 'checkers.component.html',
  styleUrls: ['checkers.component.scss']
})
export class CheckersComponent implements OnInit, AfterViewInit {

  @ViewChild('checkers', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  canvasPadding: number;

  private colors = {
    playerOne: 'dodgerblue',
    playerTwo: 'goldenrod'
  };

  private ctx: CanvasRenderingContext2D;
  private board: Board;
  private playerOne: Player;
  private playerTwo: Player;
  private currentPlayer: Player;
  private holdingChecker: boolean;
  private checkerHeld: Checker;
  private halfBoxSize: number;
  private lastBoxClicked: Box;
  private isPlaying: boolean;
  private checkerImgPlayerOne: HTMLImageElement;
  private checkerImgPlayerTwo: HTMLImageElement;
  private checkerImgKingPlayerOne: HTMLImageElement;
  private checkerImgKingPlayerTwo: HTMLImageElement;
  private playerBarWidth: number;

  constructor() {}

  ngOnInit() {
    this.setProperties();
    this.setInitialState();
  }

  ngAfterViewInit() {
    this.getCheckerImageData();
  }

  // Does not change from game to game
  setProperties() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.canvasPadding = 40;
  }

  // Changes from game to game
  setInitialState() {

    this.playerOne = Player.playerBuilder(1, this.colors.playerOne);
    this.playerTwo = Player.playerBuilder(2, this.colors.playerTwo);
    this.playerBarWidth = 20;
    this.currentPlayer = this.playerOne;
    this.holdingChecker = false;
    this.isPlaying = true;
    this.board = Board.boardBuilder([this.playerOne, this.playerTwo]);
    this.halfBoxSize = Board.boxSize * .5;
  }

  setCanvasDimensions(): void {
    this.canvas.nativeElement.width = innerWidth;
    this.canvas.nativeElement.height = innerHeight - this.canvasPadding;
  }

  async getCheckerImageData(): Promise<void> {
    const x = this.halfBoxSize;
    const y = this.halfBoxSize;
    const checkerRadius = Board.boxSize * 0.46;

    this.canvas.nativeElement.width = Board.boxSize;
    this.canvas.nativeElement.height = Board.boxSize;

    this.checkerImgPlayerOne = new Image();
    this.checkerImgPlayerOne.src = this.drawCheckerImage(x, y, checkerRadius, this.colors.playerOne, false);

    this.checkerImgPlayerTwo = new Image();
    this.checkerImgPlayerTwo.src = this.drawCheckerImage(x, y, checkerRadius, this.colors.playerTwo, false);

    this.checkerImgKingPlayerOne = new Image();
    this.checkerImgKingPlayerOne.src = this.drawCheckerImage(x, y, checkerRadius, this.colors.playerOne, true);

    this.checkerImgKingPlayerTwo = new Image();
    this.checkerImgKingPlayerTwo.src = this.drawCheckerImage(x, y, checkerRadius, this.colors.playerTwo, true);

    this.refreshCanvas();

    await this.loadImages([
      this.checkerImgPlayerOne,
      this.checkerImgPlayerTwo,
      this.checkerImgKingPlayerOne,
      this.checkerImgKingPlayerTwo
    ]);

    this.setCanvasDimensions();
    this.draw();
  }

  async loadImages(images: HTMLImageElement[]) {
    return new Promise((resolve, reject) => {
      for (const img of images) {
        img.onload = () => resolve(img);
        img.onerror = reject;
      }
    });
  }

  getCheckerCenter(x: number, y: number): Point {
    x = x - this.halfBoxSize;
    y = y - 2 * this.halfBoxSize;
    return { x, y };
  }

  handleClick(evt: MouseEvent): void {

    if (this.isPlaying) {
      const boxIdx = this.board.getBoxIndex(evt.clientX, evt.clientY);
      const box = this.board.getBox(boxIdx);

      if (box) {

        if (this.holdingChecker) {
          const availableMove: Move = this.board.getAvailableMove(box);

          if (availableMove) {
            this.placeChecker(availableMove);
          } else {
            this.returnChecker();
          }
        } else {
          const hasChecker = box.checkForValidChecker(this.currentPlayer);

          if (hasChecker) {
            this.board.setAvailableMoves(box);

            const hasAvailableMoves = this.board.state.availableMoves.length > 0;
            if (hasAvailableMoves) { this.pickUpChecker(box); }
          }
          this.lastBoxClicked = box;
        }
        this.draw();
      }
    }
  }

  handleMouseMove(evt: MouseEvent): void {
    if (this.holdingChecker) {
      const checkerCenter: Point = this.getCheckerCenter(evt.clientX, evt.clientY);
      this.checkerHeld.updatePosition(checkerCenter);
      this.draw();
    }
  }

  pickUpChecker(box: Box): void {
    this.holdingChecker = true;
    this.checkerHeld = box.state.checker as Checker;
    box.removeChecker();
  }

  placeChecker(move: Move) {
    const player = this.currentPlayer.state.id;
    const row = move.end.state.position.cell.row;
    move.end.addChecker(this.checkerHeld);

    let additionalJumps: boolean;

    if (move.isJump) {
      this.board.removeCheckerFromBoard(move.jumpedBox);
      additionalJumps = this.board.checkForAdditionalJumps(move);
    }

    if (additionalJumps) {

      this.pickUpChecker(move.end);

    } else {

      if (!this.checkerHeld.state.isKing) {
        this.board.checkIfKinged(player, row, this.checkerHeld);
      }

      const isWin = this.board.checkForWin(this.currentPlayer.state.id);

      if (isWin) {
        this.isPlaying = false;
        console.log(`Player ${this.currentPlayer.state.id + 1} wins!`);
      }

      this.changePlayer();
      this.board.resetAvailableMoves();
      this.holdingChecker = false;
      this.checkerHeld = null;
    }
  }

  returnChecker() {
    const { x, y } = this.lastBoxClicked.state.absoluteCenter;
    const checkerPosition = this.getCheckerCenter(x, y);
    this.checkerHeld.updatePosition(checkerPosition);
    this.lastBoxClicked.addChecker(this.checkerHeld);
    this.board.resetAvailableMoves();
    this.holdingChecker = false;
    this.checkerHeld = null;
  }

  changePlayer(): void {
    if (this.currentPlayer.state.id === 0) {
      this.currentPlayer = this.playerTwo;
    } else {
      this.currentPlayer = this.playerOne;
    }
  }

  draw(): void {
    this.refreshCanvas();
    this.drawPlayerBar();
    this.drawBackground();
    this.drawBoard();

    if (this.board.state.availableMoves.length > 0) {
      this.drawHighlightedSpace();
      this.drawAvailableMoves();
    }
    if (this.holdingChecker) { this.drawChecker(this.checkerHeld); }
  }

  refreshCanvas() {
    this.ctx.clearRect(0, 0, innerWidth, innerHeight - (2 * this.canvasPadding));
  }

  drawPlayerBar() {
    this.ctx.fillStyle = this.currentPlayer.state.color;
    this.ctx.fillRect(0, 0, innerWidth, innerHeight - (this.canvasPadding));
  }

  drawBackground() {
    const stroke = this.playerBarWidth;
    const x = stroke;
    const y = stroke;
    const w = this.canvas.nativeElement.width - (2 * stroke);
    const h = this.canvas.nativeElement.height - (2 * stroke);

    this.ctx.fillStyle = 'ivory';
    this.ctx.fillRect(x, y, w, h);
  }

  drawBoard() {
    const boxes = this.board.getBoxesArray();

    boxes.forEach(box => {
      this.drawBox(box);

      if (box.hasChecker()) {
        const checker = box.state.checker as Checker;
        this.drawChecker(checker);
      }
    });
  }

  drawChecker(checker: Checker) {

    const { x, y } = checker.state.position.point;

    if (checker.state.player.state.id === 0) {

      if (checker.state.isKing) {
        this.ctx.drawImage(this.checkerImgKingPlayerOne, x, y);
      } else {
        this.ctx.drawImage(this.checkerImgPlayerOne, x, y);
      }
    } else {
      if (checker.state.isKing) {
        this.ctx.drawImage(this.checkerImgKingPlayerTwo, x, y);
      } else {
        this.ctx.drawImage(this.checkerImgPlayerTwo, x, y);
      }
    }
  }

  drawBox(box: Box) {
    const { color, width, height } = box.state;
    const { x, y } = box.state.position.point;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);

    this.ctx.lineWidth = 0.5;
    this.ctx.strokeStyle = 'black';
    this.ctx.strokeRect(x, y, width, height);
  }

  drawCheckerImage(x: number, y: number, radius: number, color: string, isKing: boolean) {
    const color2 = color === this.colors.playerOne ? 'deepskyblue' : 'gold';

    // Outer Circle
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    this.ctx.fill();

    // Outer Grooves
    this.ctx.strokeStyle = color2;
    this.ctx.lineWidth = Board.boxSize * .05;

    for (let i = 0; i < 2 * Math.PI; i += 0.18) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius - 4, i, i + 0.04, false);
      this.ctx.stroke();
    }

    // Inner Circle
    this.ctx.fillStyle = color2;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius - 10, 0, 2 * Math.PI, true);
    this.ctx.fill();

    // Inner Crown
    if (isKing) {
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = Board.boxSize * .05;
      const dif = Board.boxSize / 95;
      this.ctx.beginPath();
      this.ctx.moveTo(x + 16 * dif, y + 15 * dif);
      this.ctx.lineTo(x - 15 * dif, y + 15 * dif);
      this.ctx.lineTo(x - 20 * dif, y - 10 * dif);
      this.ctx.lineTo(x - 10 * dif, y           );
      this.ctx.lineTo(x,            y - 20 * dif);
      this.ctx.lineTo(x + 10 * dif, y           );
      this.ctx.lineTo(x + 20 * dif, y - 10 * dif);
      this.ctx.lineTo(x + 15 * dif, y + 15 * dif);
    }

    this.ctx.stroke();

    return this.canvas.nativeElement.toDataURL('image/webp') as string;
  }

  drawHighlightedSpace() {
    const { x, y } = this.lastBoxClicked.state.position.point;
    const { width, height } = this.lastBoxClicked.state;

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(x, y, width, height);
  }

  drawAvailableMoves() {
    this.ctx.lineWidth = 6;

    this.board.state.availableMoves.forEach((move: Move) => {
      const { x, y } = move.end.state.position.point;
      const { width, height } = move.end.state;

      this.ctx.strokeStyle = 'yellow';
      this.ctx.strokeRect(x, y, width, height);
    });
  }
}
