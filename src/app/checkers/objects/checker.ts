import { CheckerState } from '../interfaces/checker-state';
import { Point } from 'src/app/shared/interfaces/point';
import { Player } from 'src/app/shared/player/player';

export class Checker {
  static colors: string[] = ['dodgerblue', 'goldenrod'];

  state: CheckerState;

  static checkerBuilder(player: Player, position: Point, radius: number): Checker {
    const state: CheckerState = {
      color: Checker.colors[player.state.id],
      player,
      position,
      radius,
      isKing: false
    };
    return new Checker(state);
  }

  constructor(state: CheckerState) {
    this.state = state;
  }

  updatePosition(position: Point): void {
    this.state.position = position;
  }

  makeKing(): void {
    this.state.isKing = true;
  }
}
