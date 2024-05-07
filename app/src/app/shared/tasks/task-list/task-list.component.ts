import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../tasks.model';
import { Store, select } from '@ngrx/store';
import { loadTasks, softDeleteTaskSuccess } from '../tasks.actions';
import { selectTasksError, selectTasksLoading, selectTasksWithStatus } from '../tasks.selectors';
import { AppState } from '../../../app.state';
import { loadStatuses } from '../../statuses/statuses.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';

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

  
  softDeletedTaskSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(softDeleteTaskSuccess),
    ), {dispatch: false}).subscribe((task) => {
      console.log(task);
    });


  constructor(private store:Store<AppState>, private actions$: Actions) {}

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
    this.store.dispatch(loadStatuses());

    this.tasksWithStatus$ = this.store.pipe(select(selectTasksWithStatus));
    this.loading$ = this.store.pipe(select(selectTasksLoading));
    this.error$ = this.store.pipe(select(selectTasksError));

    this.error$.subscribe(err =>  {
      if (!err) return;
      this.errorMessage = JSON.stringify(err.error)});
  }
}
