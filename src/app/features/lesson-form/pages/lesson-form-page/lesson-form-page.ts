import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-lesson-form-page',
  imports: [ReactiveFormsModule],
  templateUrl: './lesson-form-page.html',
  styleUrl: './lesson-form-page.css',
})
export class LessonFormPage implements OnInit {
  private fb = inject(FormBuilder)
  lessonForm!: FormGroup;

  ngOnInit(): void {
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
    console.log(this.lessonForm.value)
  }

  clearDraft() {
    this.lessonForm.reset();
    localStorage.removeItem('lessonDraft');
  }
}
