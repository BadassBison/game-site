import { Component, OnInit, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { GeneralGameState } from '../state/general-game-state/general.state';
import { Board } from './objects/board';
import { Player } from '../shared/player/player';
import { Checker } from './objects/checker';
import { Box } from './objects/box';
import { Move } from './interfaces/move';
import { Point } from '../shared/interfaces/point';

@Component({
  selector: 'app-checkers',
  template: '<canvas #canvas (click)="handleClick($event)" (mousemove)="handleMouseMove($event)"></canvas>',
})
export class CheckersComponent implements OnInit, OnChanges {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private board: Board;
  private playerOne: Player;
  private playerTwo: Player;
  private currentPlayer: Player;
  private holdingChecker = false;
  private checkerHeld: Checker;
  private halfBoxSize: number;
  private lastBoxClicked: Box;
  private isPlaying = true;
  private checkerImgPlayerOne: HTMLImageElement;
  private checkerImgPlayerTwo: HTMLImageElement;
  private checkerImgKingPlayerOne: HTMLImageElement;
  private checkerImgKingPlayerTwo: HTMLImageElement;

  ngOnInit(): void {
    this.updateGameSize();
  }

  ngOnChanges() {
    this.updateGameSize();
  }

  updateGameSize() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.playerOne = Player.playerBuilder(1, 'dodgerblue');
    this.playerTwo = Player.playerBuilder(2, 'goldenrod');
    this.currentPlayer = this.playerOne;
    this.board = Board.boardBuilder([this.playerOne, this.playerTwo]);
    this.getCheckerImageData(this.board.state.rowColumnSpacing);
    this.canvas.nativeElement.width = innerWidth;
    this.canvas.nativeElement.height = innerHeight;
    this.run();
  }

  getCheckerImageData(spacing: number): void {
    this.halfBoxSize = spacing * .5;
    const x = this.halfBoxSize;
    const y = this.halfBoxSize;
    const checkerRadius = spacing * 0.48;

    this.refreshCanvas();
    this.canvas.nativeElement.width = spacing;
    this.canvas.nativeElement.height = spacing;

    this.checkerImgPlayerOne = new Image();
    this.checkerImgPlayerOne.src = this.drawCheckerImage(x, y, checkerRadius, 'dodgerblue', false);

    this.checkerImgPlayerTwo = new Image();
    this.checkerImgPlayerTwo.src = this.drawCheckerImage(x, y, checkerRadius, 'goldenrod', false);

    this.checkerImgKingPlayerOne = new Image();
    this.checkerImgKingPlayerOne.src = this.drawCheckerImage(x, y, checkerRadius, 'dodgerblue', true);

    this.checkerImgKingPlayerTwo = new Image();
    this.checkerImgKingPlayerTwo.src = this.drawCheckerImage(x, y, checkerRadius, 'goldenrod', true);
  }

  getCheckerCenter(x: number, y: number): Point {
    x = x - this.halfBoxSize;
    y = y - this.halfBoxSize;
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
    const row = move.end.state.index.row;
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

      const { x, y } = move.end.state.center;
      const checkerPosition = this.getCheckerCenter(x, y);
      this.checkerHeld.updatePosition(checkerPosition);

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
    const { x, y } = this.lastBoxClicked.state.center;
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

  run(): void {
    this.draw();
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
    this.ctx.clearRect(0, 0, innerWidth, innerHeight);
  }

  drawPlayerBar() {
    this.ctx.fillStyle = this.currentPlayer.state.color;
    this.ctx.fillRect(0, 0, innerWidth, innerHeight);
  }

  drawBackground() {
    this.ctx.fillStyle = 'ivory';
    this.ctx.fillRect(20, 20, innerWidth - 40, innerHeight - 40);
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
    const position = checker.state.position;
    if (checker.state.player.state.id === 0) {

      if (checker.state.isKing) {
        this.ctx.drawImage(this.checkerImgKingPlayerOne, position.x, position.y);
      } else {
        this.ctx.drawImage(this.checkerImgPlayerOne, position.x, position.y);
      }
    } else {
      if (checker.state.isKing) {
        this.ctx.drawImage(this.checkerImgKingPlayerTwo, position.x, position.y);
      } else {
        this.ctx.drawImage(this.checkerImgPlayerTwo, position.x, position.y);
      }
    }
  }

  drawBox(box: Box) {
    const { color, width, height } = box.state;
    const { x, y } = box.state.position;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  drawCheckerImage(x: number, y: number, radius: number, color: string, isKing: boolean) {
    const color2 = color === 'dodgerblue' ? 'deepskyblue' : 'gold';

    // Outer Circle
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    this.ctx.fill();

    // Outer Grooves
    this.ctx.strokeStyle = color2;
    this.ctx.lineWidth = 6;
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
      this.ctx.lineWidth = 4;
      this.ctx.beginPath();
      this.ctx.moveTo(x + 16, y + 15);
      this.ctx.lineTo(x - 15, y + 15);
      this.ctx.lineTo(x - 20, y - 10);
      this.ctx.lineTo(x - 10, y);
      this.ctx.lineTo(x, y - 20);
      this.ctx.lineTo(x + 10, y);
      this.ctx.lineTo(x + 20, y - 10);
      this.ctx.lineTo(x + 15, y + 15);
    }

    this.ctx.stroke();

    return this.canvas.nativeElement.toDataURL() as string;
  }

  drawHighlightedSpace() {
    const { x, y } = this.lastBoxClicked.state.position;
    const { width, height } = this.lastBoxClicked.state;

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(x, y, width, height);
  }

  drawAvailableMoves() {
    this.ctx.lineWidth = 6;

    this.board.state.availableMoves.forEach((move: Move) => {
      const { x, y } = move.end.state.position;
      const { width, height } = move.end.state;

      this.ctx.strokeStyle = 'yellow';
      this.ctx.strokeRect(x, y, width, height);
    });
  }
}
