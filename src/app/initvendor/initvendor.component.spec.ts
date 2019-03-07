import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitvendorComponent } from './initvendor.component';

describe('InitvendorComponent', () => {
  let component: InitvendorComponent;
  let fixture: ComponentFixture<InitvendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitvendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitvendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
