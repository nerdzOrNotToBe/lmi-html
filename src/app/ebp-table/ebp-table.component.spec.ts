import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbpTableComponent } from './ebp-table.component';

describe('EbpTableComponent', () => {
  let component: EbpTableComponent;
  let fixture: ComponentFixture<EbpTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbpTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
