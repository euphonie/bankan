import { NgModule } from "@angular/core";
import { TaskCardComponent } from "./task-card/task-card.component";
import {MatCardModule} from '@angular/material/card';
import { TaskListComponent } from "./task-list/task-list.component";
import { CommonModule } from "@angular/common";
import { TaskModalComponent } from "./task-modal/task-modal.component";
import { MatDialogModule } from '@angular/material/dialog';
import { TaskFormComponent } from "./task-form/task-form.component";
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

@NgModule({
    declarations: [TaskCardComponent, TaskListComponent, TaskModalComponent, TaskFormComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatDialogModule,
        MatListModule,
        MatButtonModule,
        ReactiveFormsModule,
    ],
    exports: [TaskCardComponent, TaskListComponent, TaskModalComponent, TaskFormComponent]
})
export class TasksModule { }