import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsTeamComponent } from './about.us.team.component';

describe('TeamComponent', () => {
  let component: AboutUsTeamComponent;
  let fixture: ComponentFixture<AboutUsTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUsTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
