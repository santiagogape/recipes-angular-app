import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsWelcomeComponent } from './about.us.welcome.component';

describe('AboutWelcomeComponent', () => {
  let component: AboutUsWelcomeComponent;
  let fixture: ComponentFixture<AboutUsWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsWelcomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUsWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
