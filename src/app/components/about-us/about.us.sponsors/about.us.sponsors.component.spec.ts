import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsSponsorsComponent } from './about.us.sponsors.component';

describe('SponsorsComponent', () => {
  let component: AboutUsSponsorsComponent;
  let fixture: ComponentFixture<AboutUsSponsorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsSponsorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUsSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
