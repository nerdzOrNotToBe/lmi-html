import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheminementsTableComponent } from './cheminements-table.component';

describe('CheminementsTableComponent', () => {
  let component: CheminementsTableComponent;
  let fixture: ComponentFixture<CheminementsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheminementsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheminementsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
