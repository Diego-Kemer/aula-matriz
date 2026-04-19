import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
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
  private storage = inject(LessonsStorage);
  private router = inject(Router);
  
  isSaving = signal(false);
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

    this.isSaving.set(true)

     const data = this.lessonForm.value;

    if (this.isEditMode && this.lessonId) {
      this.storage.update(this.lessonId, data);
    } else {
      this.storage.create(data);
    }

    setTimeout(()=>{
      this.isSaving.set(false);
      this.lessonForm.reset();
      this.router.navigate(['/biblioteca']);
    }, 500)

  }

  clearDraft() {
    this.lessonForm.reset();
    localStorage.removeItem('lessonDraft');
  }
}
