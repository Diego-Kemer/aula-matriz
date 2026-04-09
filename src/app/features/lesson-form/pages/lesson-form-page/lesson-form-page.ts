import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
      title: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      course: ['', [Validators.required]]
    })
  }

  onSubmit(){
    console.log(this.lessonForm.value)
  }
}
