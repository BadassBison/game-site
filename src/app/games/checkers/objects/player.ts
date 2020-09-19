import { PlayerState } from '../interfaces/playerState';

export class Player {
  state: PlayerState;

  static playerBuilder(order: number, color: string, name?: string): Player {
    const state: PlayerState = {
      id: order - 1,
      name: name ? name : `Player ${order}`,
      color,
      numberOfPieces: 16
    };
    return new Player(state);
  }

  constructor(playerState: PlayerState) {
    this.state = playerState;
  }
}
