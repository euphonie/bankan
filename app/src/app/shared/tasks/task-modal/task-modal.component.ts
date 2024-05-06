import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from '../tasks.model';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent {
  
  newTask: Task = {
    title: 'default',
    status: 0,
    created_at: new Date(),
    updated_at: new Date(),
    owner: 0,
    assigned_to: 0
  };
  
  constructor(public dialogRef: MatDialogRef<TaskModalComponent>) {}

  
  close(): void {
    this.dialogRef.close();
  }
}
