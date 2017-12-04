import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondChemsTableComponent } from './cond-chems-table.component';

describe('CondChemsTableComponent', () => {
  let component: CondChemsTableComponent;
  let fixture: ComponentFixture<CondChemsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondChemsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondChemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
