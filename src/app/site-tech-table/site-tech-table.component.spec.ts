import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTechTableComponent } from './site-tech-table.component';

describe('SiteTechTableComponent', () => {
  let component: SiteTechTableComponent;
  let fixture: ComponentFixture<SiteTechTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteTechTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteTechTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
