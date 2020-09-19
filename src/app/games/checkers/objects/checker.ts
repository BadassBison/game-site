import { CheckerState } from '../interfaces/checker-state';
import { Player } from './player';
import { IPosition } from 'src/app/shared/interfaces/position';
import { Point } from 'src/app/shared/interfaces/point';

export class Checker {
  static colors: string[] = ['dodgerblue', 'goldenrod'];

  state: CheckerState;

  static checkerBuilder(player: Player, position: IPosition, radius: number): Checker {
    const state: CheckerState = {
      color: Checker.colors[player.state.id],
      player,
      position,
      radius,
      isKing: false,
      center: Checker.getCenter(position, radius)
    };
    return new Checker(state);
  }

  static getCenter(position: IPosition, radius: number): Point {
    const x = position.point.x + radius;
    const y = position.point.y + radius;
    return { x, y };
  }

  constructor(state: CheckerState) {
    this.state = state;
  }


  updatePosition(newPoint: Point): void {
    this.state.position.point = newPoint;
  }

  makeKing(): void {
    this.state.isKing = true;
  }
}
