import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoeudsTableComponent } from './noeuds-table.component';

describe('NoeudsTableComponent', () => {
  let component: NoeudsTableComponent;
  let fixture: ComponentFixture<NoeudsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoeudsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoeudsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
