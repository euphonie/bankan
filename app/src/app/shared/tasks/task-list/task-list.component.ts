import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../tasks.model';
import { Store, select } from '@ngrx/store';
import { editTask, loadTasks, restoreTask, softDeleteTask, softDeleteTaskSuccess } from '../tasks.actions';
import { selectTasksError, selectTasksLoading, selectTasksWithStatus } from '../tasks.selectors';
import { AppState } from '../../../app.state';
import { loadStatuses } from '../../statuses/statuses.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationsService } from '../../../core/NotificationsService';

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
    )).subscribe((actionResponse) => {
      
      this.notificationService.triggerNotification(
        'Want to restore the item that was deleted?',
        'default-notification',
        'Restore',
        () => {
          const restoredTask = {...actionResponse.task, 
            deleted_at: null
          };
          this.store.dispatch(restoreTask({task: restoredTask}));
        },
        6000,
      )
    });


  constructor(private store:Store<AppState>, private actions$: Actions, private notificationService: NotificationsService) {}

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
