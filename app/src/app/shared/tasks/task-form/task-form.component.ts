import { Component, Input } from '@angular/core';
import { Task } from '../tasks.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Input() task!: Task;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      'title': [this.task?.title ?? ''],
    });
  }
}
