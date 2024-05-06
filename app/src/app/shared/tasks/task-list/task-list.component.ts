import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../tasks.model';
import { Store, select } from '@ngrx/store';
import { loadTasks } from '../tasks.actions';
import { selectTasks, selectTasksError, selectTasksLoading } from '../tasks.selectors';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  tasks$: Observable<Task[]> = of();
  loading$: Observable<boolean> = of();
  error$: Observable<any> = of();

  constructor(private store:Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
    this.tasks$ = this.store.pipe(select(selectTasks));
    this.loading$ = this.store.pipe(select(selectTasksLoading));
    this.error$ = this.store.pipe(select(selectTasksError));
  }
}
