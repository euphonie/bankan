import { Component, Input } from '@angular/core';
import { Task } from '../tasks.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalAction, TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input() task!: Task;

  constructor(public taskModal: MatDialog){}

  openEditModal(): void {
    const taskModal = this.taskModal.open(TaskModalComponent, {
      data: {
        action: ModalAction.UPDATE,
        task: this.task
      }
    });

    taskModal.afterClosed().subscribe(result => {
      console.log(result);
    })
  }
}
