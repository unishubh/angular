import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoComponent } from './list-co.component';

describe('ListCoComponent', () => {
  let component: ListCoComponent;
  let fixture: ComponentFixture<ListCoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
