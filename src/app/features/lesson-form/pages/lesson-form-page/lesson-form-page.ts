import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { LessonService } from '../../../../core/services/lesson.service';
import { LessonModel } from '../../../../core/models/lesson-model';
import { LessonsStorage } from '../../../../core/state/lessons.storage';

@Component({
  selector: 'app-lesson-form-page',
  imports: [ReactiveFormsModule],
  templateUrl: './lesson-form-page.html',
  styleUrl: './lesson-form-page.css',
})
export class LessonFormPage implements OnInit {
  private fb = inject(FormBuilder)
  private route = inject(ActivatedRoute);
  private lessonServ = inject(LessonService);
  private storage = inject(LessonsStorage);
  private router = inject(Router);

  lessonId: number | null = null;
  isEditMode = false;
  lessonForm!: FormGroup;

  ngOnInit(): void {
    const lessonId = this.route.snapshot.paramMap.get('id');

    if(lessonId){
      this.lessonId = Number(lessonId)
      this.isEditMode = true;
      
      this.storage.getById(this.lessonId).subscribe({
        next: (lessonToEdit)=>{
          this.lessonForm.patchValue(lessonToEdit);
        }
      })
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

  onSubmit() {
    if (this.lessonForm.invalid) return;

     const data = this.lessonForm.value;

    if (this.isEditMode && this.lessonId) {
      this.storage.update(this.lessonId, data);
    } else {
      this.storage.create(data);
    }

    this.lessonForm.reset();
    this.router.navigate(['/library']);
  }

  clearDraft() {
    this.lessonForm.reset();
    localStorage.removeItem('lessonDraft');
  }
}
