import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeStepsComponent } from './recipe.steps.component';

describe('RecipeStepsComponent', () => {
  let component: RecipeStepsComponent;
  let fixture: ComponentFixture<RecipeStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeStepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
