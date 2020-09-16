import { ConnectionGraph } from './connectionGraph';

export interface DotState {
  id: string;
  x: number;
  column: number;
  y: number;
  row: number;
  radius: number;
  connections: ConnectionGraph;
}
