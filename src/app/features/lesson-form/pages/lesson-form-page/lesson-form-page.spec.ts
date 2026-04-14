import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonFormPage } from './lesson-form-page';
import { LessonService } from '../../../../core/services/lesson.service';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';

describe('LessonFormPage', () => {
  let fixture: ComponentFixture<LessonFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonFormPage],
      providers: [provideRouter([])]
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
      theme: 'El cuento fantástico',
      subject: 'Lengua y Literatura',
      course: '3er año',
      duration: '80 min',
      rationale: 'Marco teórico del género fantástico',
      objectives: 'Reconocer rasgos del género',
      activities: 'Lectura y análisis grupal',
      resources: '',
      assessment: '',
      notes: '',
    })

    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button') as HTMLButtonElement;

    expect(button.disabled).toBe(false);
  })

  it('should save draft in localstorage when form changes', async ()=>{
    vi.useFakeTimers();

    const component = fixture.componentInstance;
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    component.lessonForm.patchValue({
      theme: 'El cuento fantástico'
    });

    vi.advanceTimersByTime(800); // Simula el paso del tiempo para el debounce

    expect(setItemSpy).toHaveBeenCalled();

    vi.useRealTimers()
  })

  it('should clear draft and reset form', () => {
    const component = fixture.componentInstance;
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');

    component.lessonForm.patchValue({
      theme: 'Narrativa fantástica',
    });

    component.clearDraft();

    expect(component.lessonForm.get('theme')?.value).toBe(null);
    expect(removeItemSpy).toHaveBeenCalledWith('lessonDraft');
  });

  it('should update lesson when editing', ()=>{
    const route = TestBed.inject(ActivatedRoute)
    const lessonServ = TestBed.inject(LessonService);
    const component = fixture.componentInstance;
    const updateSpy = vi.spyOn(lessonServ, 'updateLesson')

    vi.spyOn(route.snapshot.paramMap, 'get').mockReturnValue('1');

    component.lessonForm.patchValue({
      theme: 'Clase actualizada',
      subject: 'Lengua',
      course: '3ro A',
      duration: '80 min',
      rationale: 'Nueva fundamentación',
      objectives: 'Nuevo objetivo',
      activities: 'Nueva actividad',
    })

    component.onSubmit();

    expect(updateSpy).toHaveBeenCalled();
  })

  it('should create lesson when form is submitted without route id', () => {
    const component = fixture.componentInstance;
    const lessonService = TestBed.inject(LessonService);
    const createSpy = vi.spyOn(lessonService, 'createLesson');

    component.lessonForm.patchValue({
      theme: 'Nueva clase',
      subject: 'Lengua',
      course: '3ro A',
      duration: '80 min',
      rationale: 'Fundamentación',
      objectives: 'Objetivos',
      activities: 'Lectura',
    });

    component.onSubmit();

    expect(createSpy).toHaveBeenCalled();
  });
})
