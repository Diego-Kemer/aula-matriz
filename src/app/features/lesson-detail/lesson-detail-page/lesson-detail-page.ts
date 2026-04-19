import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsStorage } from '../../../core/state/lessons.storage';
import { LessonModel } from '../../../core/models/lesson-model';

@Component({
  selector: 'app-lesson-detail-page',
  imports: [],
  templateUrl: './lesson-detail-page.html',
  styleUrl: './lesson-detail-page.css',
})
export class LessonDetailPage implements OnInit{

  private route = inject(ActivatedRoute);
  private storage = inject(LessonsStorage);
  private router = inject(Router);

  lesson = signal<LessonModel | null>(null);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.storage.getById(id).subscribe({
      next: (lesson) => this.lesson.set(lesson)
    });
  }

  goBack() {
    this.router.navigate(['/library']);
  }

  edit() {
    if (this.lesson()) {
      this.router.navigate(['/nueva-clase', this.lesson()!.id]);
    }
  }

}
