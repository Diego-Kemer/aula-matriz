import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonFormPage } from './lesson-form-page';

describe('LessonFormPage', () => {
  let component: LessonFormPage;
  let fixture: ComponentFixture<LessonFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonFormPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonFormPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
