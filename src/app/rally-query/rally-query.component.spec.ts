import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RallyQueryComponent } from './rally-query.component';

describe('RallyQueryComponent', () => {
  let component: RallyQueryComponent;
  let fixture: ComponentFixture<RallyQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RallyQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RallyQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
