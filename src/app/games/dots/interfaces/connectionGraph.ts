import { Dot } from '../objects/dot';

export interface ConnectionGraph {
  north: Dot;
  east: Dot;
  south: Dot;
  west: Dot;
}
