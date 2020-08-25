import { Injectable } from '@angular/core';
import { Point } from '../interfaces/point';
import { IPosition } from '../interfaces/position';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  static isOdd(num: number): boolean {
    return num % 2 === 1;
  }

  static findAbsoluteCenterPointOfRectangle(position: IPosition, width: number, height: number): Point {
    const x = position.point.x + Math.floor(width / 2);
    const y = position.point.y + Math.floor(height / 2);
    return { x, y };
  }

  static findRelativeCenterPointOfRectangle(width: number, height: number): Point {
    const x = Math.floor(width / 2);
    const y = Math.floor(height / 2);
    return { x, y };
  }

}
