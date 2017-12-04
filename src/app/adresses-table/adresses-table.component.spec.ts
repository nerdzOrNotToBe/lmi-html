import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressesTableComponent } from './adresses-table.component';

describe('AdressesTableComponent', () => {
  let component: AdressesTableComponent;
  let fixture: ComponentFixture<AdressesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdressesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
