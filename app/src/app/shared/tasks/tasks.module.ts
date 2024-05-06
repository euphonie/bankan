import { NgModule } from "@angular/core";
import { TaskCardComponent } from "./task-card/task-card.component";
import { StoreModule } from "@ngrx/store";
import { tasksReducer } from "./tasks.reducers";
import { EffectsModule } from "@ngrx/effects";
import { TasksEffects } from "./tasks.effects";
import {MatCardModule} from '@angular/material/card';
import { TaskListComponent } from "./task-list/task-list.component";
import { CommonModule } from "@angular/common";
import { TaskModalComponent } from "./task-modal/task-modal.component";
import { MatDialogModule } from '@angular/material/dialog';
import { TaskFormComponent } from "./task-form/task-form.component";
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [TaskCardComponent, TaskListComponent, TaskModalComponent, TaskFormComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        StoreModule.forFeature('tasks', tasksReducer),
        EffectsModule.forFeature([TasksEffects])
    ],
    exports: [TaskCardComponent, TaskListComponent, TaskModalComponent, TaskFormComponent]
})
export class TasksModule { }