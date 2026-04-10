import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonFormPage } from './lesson-form-page';

describe('LessonFormPage', () => {
  let fixture: ComponentFixture<LessonFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonFormPage]
    }).compileComponents();

    fixture = TestBed.createComponent(LessonFormPage);
    fixture.detectChanges();
  });

  it('should keep submit button disabled when form is invalid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button') as HTMLButtonElement;

    expect(button.disabled).toBe(true);
  });

  it('should enable submit button when form is valid', async () => {
    const component = fixture.componentInstance;
    component.lessonForm.patchValue({
      title: 'El cuento fantástico',
      subject: 'Lengua y Literatura',
      course: '3er año'
    })

    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button') as HTMLButtonElement;

    expect(button.disabled).toBe(false);
  })

  it('should enable submit button when user types in all inputs', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const inputs = compiled.querySelectorAll('input');
    const button = compiled.querySelector('button') as HTMLButtonElement;

    const titleInput = inputs[0] as HTMLInputElement;
    const subjectInput = inputs[1] as HTMLInputElement;
    const courseInput = inputs[2] as HTMLInputElement;

    titleInput.value = 'El cuento fantástico';
    titleInput.dispatchEvent(new Event('input'));

    subjectInput.value = 'Lengua y Literatura';
    subjectInput.dispatchEvent(new Event('input'));

    courseInput.value = '3ro A';
    courseInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(button.disabled).toBe(false);
  });
})
