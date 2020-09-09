import { BoxState } from '../interfaces/box-state';
import { Checker } from './checker';
import { Player } from 'src/app/shared/player/player';
import { IPosition } from 'src/app/shared/interfaces/position';
import { UtilitiesService } from 'src/app/shared/utilities/utilities.service';

export class Box {
  static colors = {
    playable: 'palegreen',
    unPlayable: 'darkgray'
  };
  static readonly empty: string = 'empty';
  static readonly unplayableSpace: string = 'unplayable space';

  state: BoxState;

  static boxBuilder(isOdd: boolean, position: IPosition, side: number): Box {
    const state: BoxState = {
      id: `${position.cell.row}${position.cell.column}`,
      color: isOdd ? Box.colors.playable : Box.colors.unPlayable,
      checker: isOdd ? Box.empty : Box.unplayableSpace,
      position,
      width: side,
      height: side,
      absoluteCenter: UtilitiesService.findAbsoluteCenterPointOfRectangle(position, side, side),
      relativeCenter: UtilitiesService.findRelativeCenterPointOfRectangle(side, side)
    };
    return new Box(state);
  }

  constructor(state: BoxState) {
    this.state = state;
  }

  buildChecker(player: Player) {
    const { cell, point } = this.state.position;
    this.state.checker = Checker.checkerBuilder(player, { cell, point }, Math.floor(this.state.width * .46));
  }

  hasChecker(): boolean {
    return (this.state.checker !== Box.empty && this.state.checker !== Box.unplayableSpace);
  }

  addChecker(checker: Checker): void {
    checker.state.position.cell = this.state.position.cell;
    checker.state.position.point = this.state.position.point;
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
