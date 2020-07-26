import { PlayerState } from './playerState';

export class Player {
  state: PlayerState;

  static playerBuilder(order: number, color: string): Player {
    const state: PlayerState = {
      id: order - 1,
      name: `Player ${order}`,
      color,
      numberOfPieces: 16
    };
    return new Player(state);
  }

  constructor(playerState: PlayerState) {
    this.state = playerState;
  }
}
