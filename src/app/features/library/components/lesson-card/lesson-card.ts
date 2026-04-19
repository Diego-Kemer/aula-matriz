import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LessonModel } from '../../../../core/models/lesson-model';

@Component({
  selector: 'app-lesson-card',
  imports: [],
  templateUrl: './lesson-card.html',
  styleUrl: './lesson-card.css',
})
export class LessonCard {
  @Input() lesson!: LessonModel;

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() duplicate = new EventEmitter<LessonModel>();
  @Output() view = new EventEmitter<number>();



  onEdit() {
    this.edit.emit(this.lesson.id);
  }

  onDelete() {
    this.delete.emit(this.lesson.id);
  }

  onDuplicate() {
    this.duplicate.emit(this.lesson);
  }

  onView() {
    this.view.emit(this.lesson.id);
  }
}
