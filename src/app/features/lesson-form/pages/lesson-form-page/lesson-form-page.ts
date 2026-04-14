import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { LESSONS_MOCK } from '../../../../utils/moks/lesson.mock/lesson.mock';
import { LessonService } from '../../../../core/services/lesson.service';

@Component({
  selector: 'app-lesson-form-page',
  imports: [ReactiveFormsModule],
  templateUrl: './lesson-form-page.html',
  styleUrl: './lesson-form-page.css',
})
export class LessonFormPage implements OnInit {
  private fb = inject(FormBuilder)
  private router = inject(ActivatedRoute);
  private lessonServ = inject(LessonService);
  lessonForm!: FormGroup;

  ngOnInit(): void {
    const lessonId = this.router.snapshot.paramMap.get('id');

    if(lessonId){
      const lessonToEdit = LESSONS_MOCK.find((lesson)=> lesson.id === Number(lessonId))

      if(lessonToEdit){
        this.lessonForm.patchValue(lessonToEdit);
      }
    };
  

    this.lessonForm = this.fb.group({
      theme: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      course: ['', [Validators.required]],
      duration: ['80 min'],

      rationale: ['', Validators.required],
      objectives: ['', Validators.required],
      activities: ['', Validators.required],

      resources: [''],
      assessment: [''],
      notes: [''],
    })

    this.lessonForm.valueChanges
    .pipe(debounceTime(800))
    .subscribe((value) => {
      localStorage.setItem('lessonDraft', JSON.stringify(value));
    });

    const savedDraft = localStorage.getItem('lessonDraft');

    if(savedDraft){
      this.lessonForm.patchValue(JSON.parse(savedDraft))
    }
  }

  onSubmit(){
    const lessonId = this.router.snapshot.paramMap.get('id');

    if(lessonId){
      this.lessonServ.updateLesson({
        ...this.lessonForm.value,
        id: Number(lessonId),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'draft',
      });
      return;
    }

    console.log(this.lessonForm.value)
  }

  clearDraft() {
    this.lessonForm.reset();
    localStorage.removeItem('lessonDraft');
  }
}
