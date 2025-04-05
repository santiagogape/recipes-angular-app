import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsMarketingComponent } from './about.us.marketing.component';

describe('AboutMarketingComponent', () => {
  let component: AboutUsMarketingComponent;
  let fixture: ComponentFixture<AboutUsMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsMarketingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUsMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
