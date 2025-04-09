import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesWelcomeBrowserComponent } from './recipes.welcome.browser.component';

describe('ResipesBrowserComponent', () => {
  let component: RecipesWelcomeBrowserComponent;
  let fixture: ComponentFixture<RecipesWelcomeBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesWelcomeBrowserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipesWelcomeBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
