import { PlayerState } from '../interfaces/player-state';

export class Player {
  state: PlayerState;

  static playerBuilder(order: number, color: string, name?: string): Player {
    const state: PlayerState = {
      id: order - 1,
      name: name ? name : `Player ${order}`,
      color,
      squares: []
    };
    return new Player(state);
  }

  constructor(state: PlayerState) {
    this.state = state;
  }
}
