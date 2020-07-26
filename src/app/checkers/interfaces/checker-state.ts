import { Player } from 'src/app/shared/player/player';
import { Point } from 'src/app/shared/interfaces/point';

export interface CheckerState {
  color: string;
  radius: number;
  player: Player;
  position: Point;
  isKing: boolean;
}
