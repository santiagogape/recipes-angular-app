import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularIngredientsComponent } from './popular-ingredients.component';

describe('PopularIngredientsComponent', () => {
  let component: PopularIngredientsComponent;
  let fixture: ComponentFixture<PopularIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularIngredientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
