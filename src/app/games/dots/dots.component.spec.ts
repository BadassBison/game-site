import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';

import { DotsComponent } from './dots.component';

describe('DotsComponent', () => {
  let component: DotsComponent;
  let fixture: ComponentFixture<DotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotsComponent ],
      imports: [
        SharedModule,
        BrowserAnimationsModule
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial view menu', () => {

    it('should show the start menu', () => {
      const menu = fixture.debugElement.query(By.css('.start-screen'));
      expect(menu).toBeTruthy();
    });

  });

  describe('#startGame', () => {

    beforeEach(() => {
      component.startGame();
    });

    it('should set property \'gameStarted\' to true', () => {
      expect(component.gameStarted).toBeTruthy();
    });

    it('should set property \'gameInitialized\' to false', () => {
      expect(component.gameInitialized).toBeFalsy();
    });

    it('should have an undefined board', () => {
      expect(component.board).toBeUndefined();
    });

    describe('after change detection', () => {

      beforeEach(() => {
        fixture.detectChanges();
      });

      it('should set property \'gameInitialized\' to true after view is checked', () => {
        expect(component.gameInitialized).toBeTruthy();
      });

      it('should build a new board', () => {
        expect(component.board).toBeDefined();
      });
    });
  });

});
