import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LESSONS_MOCK } from '../../../../utils/moks/lesson.mock/lesson.mock';
import { LessonModel } from '../../../../core/models/lesson-model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LessonService } from '../../../../core/services/lesson.service';
import { LessonsStorage } from '../../../../core/state/lessons.storage';

@Component({
  selector: 'app-library-page',
  imports: [FormsModule],
  templateUrl: './library-page.html',
  styleUrl: './library-page.css',
})
export class LibraryPage implements OnInit{

  storage = inject(LessonsStorage);
  private router = inject(Router);

  search = signal('');

  filteredLessons = computed(() => {
    return this.storage.lessons().filter((lesson) =>
      lesson.theme.toLowerCase().includes(this.search().toLowerCase())
    );
  });

  ngOnInit() {
    this.storage.load();
  }

  deleteLesson(id: number) {
    if (confirm('¿Seguro que querés eliminar esta clase?')) {
      this.storage.delete(id);
    }
  }

  duplicateLesson(lesson: LessonModel) {
    const duplicated: Partial<LessonModel> = {
      theme: `${lesson.theme} (copia)`,
      subject: lesson.subject,
      course: lesson.course,
      duration: lesson.duration,
      rationale: lesson.rationale,
      objectives: lesson.objectives,
      activities: lesson.activities,
      resources: lesson.resources,
      assessment: lesson.assessment,
      notes: lesson.notes,
      status: 'draft'
    };

    this.storage.create(duplicated);
  }

  editLesson(id: number) {
    this.router.navigate(['/nueva-clase', id]);
  }
}
