import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResipesBrowserComponent } from './resipes-browser.component';

describe('ResipesBrowserComponent', () => {
  let component: ResipesBrowserComponent;
  let fixture: ComponentFixture<ResipesBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResipesBrowserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResipesBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
