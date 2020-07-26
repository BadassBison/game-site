import { BoxState } from '../interfaces/box-state';
import { UtilitiesService } from 'src/app/shared/utilities/utilities.service';
import { Cell } from 'src/app/shared/interfaces/cell';
import { Point } from 'src/app/shared/interfaces/point';
import { Checker } from './checker';
import { Player } from 'src/app/shared/player/player';

export class Box {
  static colors: string[] = ['palegreen', 'darkgray'];
  static readonly empty: string = 'empty';
  static readonly unplayableSpace: string = 'unplayable space';

  state: BoxState;

  static boxBuilder(isOdd: boolean, index: Cell, position: Point, side: number): Box {
    const state: BoxState = {
      id: `${index.row}${index.column}`,
      color: isOdd ? Box.colors[0] : Box.colors[1],
      checker: isOdd ? Box.empty : Box.unplayableSpace,
      index,
      position,
      width: side,
      height: side,
      center: UtilitiesService.findCenterPointOfRectangle(position, side, side)
    };
    return new Box(state);
  }

  constructor(state: BoxState) {
    this.state = state;
  }

  buildChecker(player: Player) {
    this.state.checker = Checker.checkerBuilder(player, this.state.position, Math.floor(this.state.width * .46));
  }

  hasChecker(): boolean {
    return (this.state.checker !== Box.empty && this.state.checker !== Box.unplayableSpace);
  }

  addChecker(checker: Checker): void {
    this.state.checker = checker;
  }

  removeChecker(): void {
    this.state.checker = Box.empty;
  }

  checkForValidChecker(player: Player): boolean {
    if (this.hasChecker()) {
      const checker: Checker = this.state.checker as Checker;
      return player.state.id === checker.state.player.state.id;
    }
    return false;
  }

}
