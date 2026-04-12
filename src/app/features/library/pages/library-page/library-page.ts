import { Component } from '@angular/core';
import { LESSONS_MOCK } from '../../../../utils/moks/lesson.mock/lesson.mock';
import { LessonModel } from '../../../../core/models/lesson-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-library-page',
  imports: [FormsModule],
  templateUrl: './library-page.html',
  styleUrl: './library-page.css',
})
export class LibraryPage {

  public search = '';

  lessons: LessonModel[] = LESSONS_MOCK;

  get filteredLessons() {
    return this.lessons.filter((lesson) =>
      lesson.theme.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  duplicateLesson(lesson: LessonModel) {
    const duplicatedLesson: LessonModel = {
      ...lesson,
      id: Date.now(),
      theme: `${lesson.theme} (copia)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft',
    };

    this.lessons = [duplicatedLesson, ...this.lessons];
  }

  deleteLesson(id: number) {
    if (confirm('¿Seguro que querés eliminar esta clase?')){
      this.lessons = this.lessons.filter((lesson) => lesson.id !== id);
    }else{
      return;
    }

  }
}
