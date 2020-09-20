import { Dot } from './dot';
import { DotState } from '../interfaces/dot-state';
import { Drawer } from './drawer';

describe('Dot', () => {

  let sut: Dot;
  const x = 1;
  const y = 1;
  const rows = 5;
  const columns = 5;

  beforeEach(() => {
    sut = Dot.dotBuilder(x, y, columns, rows);
  });

  describe('when factory method is invoked', () => {

    it('should initialize a new Dot', () => {
      expect(sut).toBeTruthy();
    });

    it('should set the state', () => {
      const expectedState: DotState = {
        id: `${columns}${rows}`,
        x,
        y,
        column: columns,
        row: rows,
        radius: 8,
        connections: {
          north: null,
          east: null,
          south: null,
          west: null
        }
      };

      expect(sut.state).toEqual(expectedState);
    });
  });

});

describe('Drawer - when constructed', () => {

  let sut: Drawer;
  let canvas: HTMLCanvasElement;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    sut = new Drawer(canvas);
  });

  it('should initialize a new Drawer', () => {
    expect(sut).toBeTruthy();
  });

  it('should set the canvas property to the given canvas', () => {
    expect(sut.canvas).toEqual(canvas);
  });

  it('should set the ctx', () => {
    const ctx = canvas.getContext('2d');
    expect(sut.ctx).toEqual(ctx);
  });

});
