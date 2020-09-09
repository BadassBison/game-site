import { Checker } from '../objects/checker';
import { Point } from 'src/app/shared/interfaces/point';
import { IPosition } from 'src/app/shared/interfaces/position';

export interface BoxState {
  id: string;
  color: string;
  checker: string | Checker;
  position: IPosition;
  width: number;
  height: number;
  relativeCenter: Point;
  absoluteCenter: Point;
}
