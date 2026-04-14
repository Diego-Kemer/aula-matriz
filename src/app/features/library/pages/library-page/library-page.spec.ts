import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryPage } from './library-page';
import { provideRouter, Router } from '@angular/router';

describe('LibraryPage', () => {
  let component: LibraryPage;
  let fixture: ComponentFixture<LibraryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryPage],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should duplicate lesson', () => {
    const originalLength = component.lessons.length;
    const lesson = component.lessons[0];

    component.duplicateLesson(lesson);

    expect(component.lessons.length).toBe(originalLength + 1);
    expect(component.lessons[0].theme).toContain('(copia)');
  });

  it('should delete lesson after confirmation', ()=>{
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    const initialLength = component.lessons.length;
    const lessonId = component.lessons[0].id;

    component.deleteLesson(lessonId);

    expect(component.lessons.length).toBe(initialLength - 1);
  })

  it('should navigate to edit lesson route', ()=>{
    const router = TestBed.inject(Router)
    const navigateSpy = vi.spyOn(router, 'navigate');

    component.editLesson(1);

    expect(navigateSpy).toHaveBeenCalledWith(['/nueva-clase', 1])
  })
});
