import { Component, OnInit } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { Task } from '../tasks.model';
import { Store, select } from '@ngrx/store';
import { loadTasks, restoreTask, softDeleteTaskSuccess } from '../tasks.actions';
import { selectCompletedTasks, selectPendingTasks, selectTasksError, selectTasksLoading } from '../tasks.selectors';
import { AppState } from '../../../app.state';
import { loadStatuses } from '../../statuses/statuses.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationsService } from '../../../core/NotificationsService';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  pendingTasks$!: Observable<Task[]>;
  completedTasks$!: Observable<Task[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<HttpErrorResponse>;

  form!: FormGroup;
  filterState = {
    selectedStatus: 1
  };

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


  constructor(private store:Store<AppState>, private actions$: Actions, private notificationService: NotificationsService, private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedStatus: [this.filterState.selectedStatus]
    })
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
    this.store.dispatch(loadStatuses());

    this.pendingTasks$ = 
      this.store.pipe(select(selectPendingTasks));
    this.completedTasks$ = 
      this.store.pipe(select(selectCompletedTasks));
    this.loading$ = this.store.pipe(select(selectTasksLoading));
    this.error$ = this.store.pipe(select(selectTasksError));

    
    this.form.valueChanges.subscribe((value) => {
      this.filterState.selectedStatus = Number(value.selectedStatus);
      console.log(value);
    })

    this.error$.subscribe(err =>  {
      if (!err) return;
      this.errorMessage = JSON.stringify(err.error)});
  }
}
