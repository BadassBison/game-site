import { DotState } from '../interfaces/dot-state';

export class Dot {

  state: DotState;

  static dotBuilder(x: number, y: number, column: number, row: number): Dot {
    const state: DotState = {
      id: `${column}${row}`,
      x,
      y,
      column,
      row,
      radius: 8,
      connections: {
        north: null,
        east: null,
        south: null,
        west: null
      }
    };
    return new Dot(state);
  }

  constructor(state: DotState) {
    this.state = state;
  }

  addConnection(fromDirection: string, dot: Dot) {
    switch (fromDirection.toLocaleLowerCase()) {
      case 'north':
        this.state.connections.north = dot;
        break;
      case 'east':
        this.state.connections.east = dot;
        break;
      case 'south':
        this.state.connections.south = dot;
        break;
      case 'west':
        this.state.connections.west = dot;
        break;
    }
  }
}
