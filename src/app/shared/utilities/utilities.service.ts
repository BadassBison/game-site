import { Injectable } from '@angular/core';
import { Point } from '../interfaces/point';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  static isOdd(num: number): boolean {
    return num % 2 === 1;
  }

  static findCenterPointOfRectangle(position: Point, width: number, height: number): Point {
    const x = position.x + Math.floor(width / 2);
    const y = position.y + Math.floor(height / 2);
    return { x, y };
  }

}
