import { Component, ViewChild, ElementRef, AfterViewChecked, HostListener } from '@angular/core';
import { Board } from './objects/board';
import { Player } from './objects/player';
import { Drawer } from './objects/drawer';

@Component({
  selector: 'app-dots',
  templateUrl: './dots.component.html',
  styleUrls: ['./dots.component.scss'],
})
export class DotsComponent implements AfterViewChecked {

  @ViewChild('dots', { static: false })
  canvas: ElementRef<HTMLCanvasElement>;

  gameStarted = false;
  gameInitialized = false;
  gameContinued = false;
  showingInformation = false;

  board: Board;
  drawer: Drawer;
  rows: number;
  columns: number;
  playerOneName: string;
  playerOneColor: string;
  playerTwoName: string;
  playerTwoColor: string;
  colors: string[] = ['red', 'blue', 'green', 'purple', 'orange'];

  @HostListener('window:keydown', ['$event.key'])
  onKeypress(btn: string) {
    if (btn === 'm') {
      this.gameStarted = false;
    }
  }

  ngAfterViewChecked() {
    if (this.gameStarted) {
      if (!this.gameInitialized) {
        this.initializeGame();
      } else if (this.gameContinued) {
        console.log(this.board);
        this.reinitializeGame();
      }
    }
  }

  startGame() {
    this.gameStarted = true;
    this.gameInitialized = false;
  }

  continueGame() {
    this.gameStarted = true;
    this.gameContinued = true;
  }

  toggleInformation() {
    this.showingInformation = !this.showingInformation;
  }

  initializeGame() {
    this.setCanvasDimensions();
    this.board = Board.boardBuilder(
      this.rows > 3 ? this.rows : 6,
      this.columns > 3 ? this.columns : 6,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height,
      this.buildPlayers()
    );

    this.drawer = new Drawer(this.canvas.nativeElement);
    this.drawer.draw(this.board, true);
    this.gameInitialized = true;
  }

  reinitializeGame() {
    this.setCanvasDimensions();
    this.drawer.setCanvas(this.canvas.nativeElement);
    this.drawer.draw(this.board, true);
    this.gameContinued = false;
  }

  handleClick(evt: MouseEvent): void {
    this.board.handleClick(evt);
    if (this.board.state.startingDot) {
      this.drawer.draw(this.board, false);
    } else {
      this.drawer.draw(this.board, true);
    }
  }

  finishGame() {
    // TODO: Add UI for the game over screen
    console.log('Game is over');
  }

  private setCanvasDimensions(): void {
    this.canvas.nativeElement.width = innerWidth;
    this.canvas.nativeElement.height = innerHeight - 40;
  }

  private buildPlayers(): Player[] {
    const playerOne: Player = Player.playerBuilder(1, this.playerOneColor || 'blue', this.playerOneName);
    const playerTwo: Player = Player.playerBuilder(2, this.playerTwoColor || 'red', this.playerTwoName);
    return [playerOne, playerTwo];
  }

}
