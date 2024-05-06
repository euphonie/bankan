import { Component } from '@angular/core';
import { TaskModalComponent } from '../shared/tasks/task-modal/task-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(public taskModal: MatDialog) {}

  openTaskModal(mode: string) : void {
    const taskModal = this.taskModal.open(TaskModalComponent);

    taskModal.afterClosed().subscribe(result => {
      console.log(result);
    })
  }
}
