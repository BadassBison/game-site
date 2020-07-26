import { Checker } from '../objects/checker';
import { Point } from 'src/app/shared/interfaces/point';
import { Cell } from 'src/app/shared/interfaces/cell';

export interface BoxState {
  id: string;
  color: string;
  checker: string | Checker;
  position: Point;
  width: number;
  height: number;
  center: Point;
  index: Cell;
}
