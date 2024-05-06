import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from '../tasks.model';

export enum ModalAction {
  'CREATE',
  'UPDATE'
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
  @Input() task!: Task;
  @Input() action: ModalAction = ModalAction.CREATE;
  
  constructor(public dialogRef: MatDialogRef<TaskModalComponent>) {}
  
  ngOnInit(): void {
    if (this.action === ModalAction.CREATE) {
      this.task = this.newTask;
    }  
  }

  
  close(): void {
    this.dialogRef.close();
  }
}
