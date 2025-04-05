import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsStatsComponent } from './about.us.stats.component';

describe('StatsComponent', () => {
  let component: AboutUsStatsComponent;
  let fixture: ComponentFixture<AboutUsStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
