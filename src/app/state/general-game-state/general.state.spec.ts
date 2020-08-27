import { Store, NgxsModule } from '@ngxs/store';
import { async, TestBed } from '@angular/core/testing';
import { SetCanvas, SetCtx } from './actions';
import { GeneralGameState, GeneralGameStateModel } from './general.state';
import { ElementRef } from '@angular/core';

// TODO: Write tests
describe('GeneralGameState', () => {

  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([GeneralGameState])]
    }).compileComponents().then(() => {
      store = TestBed.inject(Store);
    });
  }));

});
