import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { SharedModule } from '../../shared/shared.module';
import { CheckersComponent } from './checkers.component';

describe('CheckersComponent', () => {
  let component: CheckersComponent;
  let fixture: ComponentFixture<CheckersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckersComponent ],
      imports: [
        BrowserAnimationsModule,
        SharedModule
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
