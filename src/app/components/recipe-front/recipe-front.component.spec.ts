import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFrontComponent } from './recipe-front.component';

describe('RecipeFrontComponent', () => {
  let component: RecipeFrontComponent;
  let fixture: ComponentFixture<RecipeFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeFrontComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
