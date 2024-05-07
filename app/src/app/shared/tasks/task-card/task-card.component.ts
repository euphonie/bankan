import { Component, Input } from '@angular/core';
import { Task } from '../tasks.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalAction, TaskModalComponent } from '../task-modal/task-modal.component';
import { editTask, softDeleteTask } from '../tasks.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { STATUS } from '../../statuses/statuses.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('300ms ease-in-out', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class TaskCardComponent {
[x: string]: any;
  @Input() task!: Task;
  readonly STATUS = STATUS;
  showActions: boolean = false;

  constructor(public taskModal: MatDialog, private store: Store<AppState>){}

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


  onSoftDelete(): void {
    this.store.dispatch(softDeleteTask({task: this.task}));
  }

  
  onToggleComplete(): void {
    const completedTask = {
      ...this.task,
      statusId: this.task.statusId == STATUS.PENDING ? STATUS.COMPLETED : STATUS.PENDING,
    };
    this.store.dispatch(editTask({task: completedTask}));
  }

  toggleActions() {
    this.showActions = !this.showActions;
  }
}
