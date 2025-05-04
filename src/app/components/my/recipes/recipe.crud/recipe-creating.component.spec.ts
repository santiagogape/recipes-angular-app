import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCreatingComponent } from './recipe-creating.component';

describe('RecipeCrudComponent', () => {
  let component: RecipeCreatingComponent;
  let fixture: ComponentFixture<RecipeCreatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCreatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
