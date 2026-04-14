import { Injectable } from '@angular/core';
import { LessonModel } from '../models/lesson-model';
import { LESSONS_MOCK } from '../../utils/moks/lesson.mock/lesson.mock';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  private lessons: LessonModel[] = [...LESSONS_MOCK];

  getLessons(){
    return this.lessons;
  }

  getLessonById(id: number){
    return this.lessons.find((lesson)=> lesson.id === id);
  }

  updateLesson(updatedLesson: LessonModel){
    this.lessons = this.lessons.map((lesson)=>
      lesson.id === updatedLesson.id ? updatedLesson : lesson
    )
  }
  
}
