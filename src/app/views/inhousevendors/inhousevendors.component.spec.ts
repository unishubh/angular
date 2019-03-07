import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InhousevendorsComponent } from './inhousevendors.component';

describe('InhousevendorsComponent', () => {
  let component: InhousevendorsComponent;
  let fixture: ComponentFixture<InhousevendorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InhousevendorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InhousevendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
