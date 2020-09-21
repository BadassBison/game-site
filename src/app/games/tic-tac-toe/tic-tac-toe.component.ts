import { Component, ElementRef, ViewChild, AfterViewChecked, HostListener } from '@angular/core';
import { Drawer } from './objects/drawer';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss'],
})
export class TicTacToeComponent implements AfterViewChecked {

  @ViewChild('ticTacToe', { static: false })
  canvas: ElementRef<HTMLCanvasElement>;

  gameStarted = false;
  gameInitialized = false;
  gameContinued = false;
  showingInformation = false;

  drawer: Drawer;

  playerOneName: string;
  playerOneColor: string;
  playerTwoName: string;
  playerTwoColor: string;
  colors: string[] = ['red', 'blue', 'green', 'purple', 'orange'];

  @HostListener('window:keydown', ['$event.key'])
  onKeypress(btn: string) {
    console.log({ btn });

    if (btn === 'm') {
      this.gameStarted = false;
    }
  }

  ngAfterViewChecked() {
    if (this.gameStarted) {
      if (!this.gameInitialized) {
        this.initializeGame();
      } else if (this.gameContinued) {
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
    this.drawer = new Drawer(this.canvas.nativeElement);
    this.drawer.draw();
    this.gameInitialized = true;
  }

  reinitializeGame() {
    this.setCanvasDimensions();
    this.drawer.setCanvas(this.canvas.nativeElement);
    this.drawer.draw();
    this.gameContinued = false;
  }

  handleClick(evt: MouseEvent): void {
    console.log({ evt });
  }

  private setCanvasDimensions(): void {
    this.canvas.nativeElement.width = innerWidth;
    this.canvas.nativeElement.height = innerHeight - 40;
  }

}
