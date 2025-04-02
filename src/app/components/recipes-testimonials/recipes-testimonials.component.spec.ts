import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesTestimonialsComponent } from './recipes-testimonials.component';

describe('RecipesTestimonialsComponent', () => {
  let component: RecipesTestimonialsComponent;
  let fixture: ComponentFixture<RecipesTestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesTestimonialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipesTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
