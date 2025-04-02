import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutWelcomeComponent } from './about-welcome.component';

describe('AboutWelcomeComponent', () => {
  let component: AboutWelcomeComponent;
  let fixture: ComponentFixture<AboutWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutWelcomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
