import { inject, Injectable } from '@angular/core';
import { LessonModel } from '../models/lesson-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/lessons`;

    getAll() {
      return this.http.get<LessonModel[]>(this.apiUrl);
    }

    create(data: Partial<LessonModel>) {
      return this.http.post<LessonModel>(this.apiUrl, data);
    }

    update(id: number, data: Partial<LessonModel>) {
      return this.http.patch<LessonModel>(`${this.apiUrl}/${id}`, data);
    }

    delete(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
