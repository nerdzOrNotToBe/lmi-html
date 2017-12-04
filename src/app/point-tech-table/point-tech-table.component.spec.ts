import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointTechTableComponent } from './point-tech-table.component';

describe('PointTechTableComponent', () => {
  let component: PointTechTableComponent;
  let fixture: ComponentFixture<PointTechTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointTechTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointTechTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
