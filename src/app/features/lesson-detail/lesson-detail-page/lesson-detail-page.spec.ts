import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDetailPage } from './lesson-detail-page';

describe('LessonDetailPage', () => {
  let component: LessonDetailPage;
  let fixture: ComponentFixture<LessonDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
