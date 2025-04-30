import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsSliderComponent } from './testimonials.slider.component';

describe('TestimonialsSliderComponent', () => {
  let component: TestimonialsSliderComponent;
  let fixture: ComponentFixture<TestimonialsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialsSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
