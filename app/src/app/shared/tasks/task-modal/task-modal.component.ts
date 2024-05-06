import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../tasks.model';
import { addTask, editTask } from '../tasks.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';

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
  
  newTask: Task = {
    title: '',
    statusId: 1,
    created_at: new Date(),
    updated_at: new Date(),
    owner: 1,
    assigned_to: 1
  };
  
  constructor(public dialogRef: MatDialogRef<TaskModalComponent>, @Inject(MAT_DIALOG_DATA) public data: ModalData, private store: Store<AppState>) {}
  
  ngOnInit(): void {
    if (this.data.action === ModalAction.CREATE) {
      this.data.task = this.newTask;
    }
  }
  
  close(): void {
    this.dialogRef.close();
  }

  
  isNewModel(): boolean {
    return !this.data.task || !this.data.task.id;
  }

  onCreate(): void {
    this.store.dispatch(addTask({task: this.data.task}));
  }

  onUpdate(): void {
    this.store.dispatch(editTask({task: this.data.task}));
  }
}
