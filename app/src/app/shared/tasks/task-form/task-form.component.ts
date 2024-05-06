import { Component, Input } from '@angular/core';
import { Task } from '../tasks.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTask } from '../tasks.actions';
import { AppState } from '../../../app.state';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Input() task!: Task;
  form: FormGroup;


  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.form = this.fb.group({
      'title': [this.task?.title ?? ''],
    });

    this.form.valueChanges.subscribe(value => {
      this.task.title = value.title;
    })
  }

  isNewModel(): boolean {
    return !this.task || !this.task.id;
  }

  onCreate(): void {
    this.store.dispatch(addTask({task: this.task}));
  }

  onUpdate(): void {

  }
}
