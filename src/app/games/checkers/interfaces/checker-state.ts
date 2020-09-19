import { Player } from '../objects/player';
import { IPosition } from 'src/app/shared/interfaces/position';
import { Point } from 'src/app/shared/interfaces/point';

export interface CheckerState {
  color: string;
  radius: number;
  player: Player;
  position: IPosition;
  isKing: boolean;
  center: Point;
}
