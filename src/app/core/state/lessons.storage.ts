import { inject, Injectable, signal } from '@angular/core';
import { LessonService } from '../services/lesson.service';
import { LessonModel } from '../models/lesson-model';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class LessonsStorage {
  private lessonService = inject(LessonService);

  lessons = signal<LessonModel[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  private toast = inject(ToastService);

  load() {
    this.loading.set(true);
    this.error.set(null);

    this.lessonService.getAll().subscribe({
      next: (data) => {
        this.lessons.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar clases');
        this.loading.set(false);
      }
    });
  }

  create(data: Partial<LessonModel>) {
    this.lessonService.create(data).subscribe({
      next: (lesson) => {
        this.lessons.update(prev => [lesson, ...prev]);
        this.toast.show('Clase creada correctamente', 'success');
      }
    });
  }

  update(id: number, data: Partial<LessonModel>) {
    this.lessonService.update(id, data).subscribe({
      next: (updated) => {
        this.lessons.update(prev =>
          prev.map(l => l.id === id ? updated : l)
        );
        this.toast.show('Clase actualizada correctamente', 'success');
      }
    });
  }

  delete(id: number) {
    this.lessonService.delete(id).subscribe({
      next: () => {
        this.lessons.update(prev =>
          prev.filter(l => l.id !== id)
        );
        this.toast.show('Clase eliminada correctamente', 'info');
      }
    });
  }

  getById(id: number) {
    return this.lessonService.getById(id);
  }

  
}
