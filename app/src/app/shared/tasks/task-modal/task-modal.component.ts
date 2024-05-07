import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../tasks.model';
import { addTask, addTaskSuccess, editTask, editTaskSuccess } from '../tasks.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { selectTasksLoading } from '../tasks.selectors';
import { Observable } from 'rxjs';
import { NotificationsService } from '../../../core/NotificationsService';
import { Actions, createEffect, ofType } from '@ngrx/effects';

export enum ModalAction {
  'CREATE',
  'UPDATE'
}

export interface ModalData {
  action: ModalAction,
  task: Task,
}

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent implements OnInit {

  loading$!: Observable<boolean>;

  newTask: Task = {
    title: '',
    statusId: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: undefined,
    owner: 1,
    assigned_to: 1
  };

  addTaskSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTaskSuccess),
    ), { dispatch: false }).subscribe(() => {
      this.close();
    });
  
  editTaskSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(editTaskSuccess),
      ), { dispatch: false }).subscribe(() => {
        this.close();
      });

  constructor(public dialogRef: MatDialogRef<TaskModalComponent>, @Inject(MAT_DIALOG_DATA) public data: ModalData, private store: Store<AppState>, private notificationService: NotificationsService, private actions$: Actions) { }

  ngOnInit(): void {
    if (this.data.action === ModalAction.CREATE) {
      this.data.task = this.newTask;
    }
    this.loading$ = this.store.pipe(select(selectTasksLoading));
  }

  close(): void {
    this.dialogRef.close();
  }


  isNewModel(): boolean {
    return !this.data.task || !this.data.task.id;
  }

  onAdd(): void {
    if (!this.validate(this.data.task)) return;
    this.store.dispatch(addTask({ task: this.data.task }));
  }

  onEdit(): void {
    if (!this.validate(this.data.task)) return;
    this.store.dispatch(editTask({ task: this.data.task }));
  }


  validate(form: Task): boolean {
    if (form.title === '') {
      this.notificationService.triggerNotification(
        'Title can not be empty'
      )
      return false;
    }
    if (form.statusId === undefined) {
      this.notificationService.triggerNotification(
        'Status must be selected'
      )
      return false;
    }
    return true;
  }


}
