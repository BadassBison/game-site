import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetCanvas, SetCtx, SetWidthAndHeight } from './actions';
import { ElementRef } from '@angular/core';

export class GeneralGameStateModel {
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
}

@State<GeneralGameStateModel>({
  name: 'GeneralGameState',
  defaults: {
    canvas: null,
    ctx: null
  }
})
export class GeneralGameState {

  @Selector()
  static getGeneralGameState(state: GeneralGameStateModel) {
    return state;
  }

  @Selector()
  static getCanvas(state: GeneralGameStateModel) {
    return state.canvas;
  }

  @Selector()
  static getCtx(state: GeneralGameStateModel) {
    return state.ctx;
  }

  @Action(SetCanvas)
  setCanvas( { patchState }: StateContext<GeneralGameStateModel>, { canvas }: SetCanvas) {
    patchState({ canvas });
  }

  @Action(SetCtx)
  setCtx( { patchState }: StateContext<GeneralGameStateModel>, { ctx }: SetCtx) {
    patchState({ ctx });
  }

  // @Action(SetWidthAndHeight)
  // setWidthAndHeight( { getState, patchState }: StateContext<GeneralGameStateModel>, { widthAndHeight }: SetWidthAndHeight) {
  //   const currentate getState().canvas
  //   patchState({  });
  // }

}
