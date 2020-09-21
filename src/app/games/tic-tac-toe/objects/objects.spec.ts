import { Drawer } from './drawer';

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
