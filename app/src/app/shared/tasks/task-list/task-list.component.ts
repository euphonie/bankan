import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../tasks.model';
import { Store, select } from '@ngrx/store';
import { loadTasks } from '../tasks.actions';
import { selectTasksError, selectTasksLoading, selectTasksWithStatus } from '../tasks.selectors';
import { AppState } from '../../../app.state';
import { loadStatuses } from '../../statuses/statuses.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  tasksWithStatus$!: Observable<Task[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<HttpErrorResponse>;

  errorMessage: string = '';

  constructor(private store:Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
    this.store.dispatch(loadStatuses());

    this.tasksWithStatus$ = this.store.pipe(select(selectTasksWithStatus));
    this.loading$ = this.store.pipe(select(selectTasksLoading));
    this.error$ = this.store.pipe(select(selectTasksError));

    this.tasksWithStatus$.subscribe(task => console.log(task));

    this.error$.subscribe(err =>  {
      if (!err) return;
      this.errorMessage = JSON.stringify(err.error)});
  }
}
