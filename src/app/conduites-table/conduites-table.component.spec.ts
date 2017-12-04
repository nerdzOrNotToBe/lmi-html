import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConduitesTableComponent } from './conduites-table.component';

describe('ConduitesTableComponent', () => {
  let component: ConduitesTableComponent;
  let fixture: ComponentFixture<ConduitesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConduitesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConduitesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
