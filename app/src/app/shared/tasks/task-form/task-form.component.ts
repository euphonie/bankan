import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Task } from '../tasks.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectStatuses } from '../../statuses/statuses.selectors';
import { AppState } from '../../../app.state';
import { Status } from '../../statuses/statuses.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  @Input() task!: Task;
  form: FormGroup;

  statuses$: Observable<Status[]>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.statuses$ = this.store.pipe(select(selectStatuses));

    this.form = this.fb.group({
      'title': [this.task?.title ?? ''],
      'statusId': [this.task?.statusId ?? undefined]
    });
  }
  ngOnInit(): void {
    if (this.task) {
      this.form = this.fb.group({
        'title': [this.task.title],
        'statusId': [this.task.statusId],
      });
    }
    
    this.form.valueChanges.subscribe(value => {
      this.task.title = value.title;
      this.task.statusId = value.statusId;
    });
  }
}
