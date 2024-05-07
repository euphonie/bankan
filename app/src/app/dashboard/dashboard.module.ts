import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { TasksModule } from "../shared/tasks/tasks.module";
import {MatButtonModule} from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterOutlet } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [DashboardComponent],
    imports: [RouterOutlet, MatIconModule, MatGridListModule, MatButtonModule, TasksModule, CommonModule],
    exports: [DashboardComponent]
})
export class DashboardModule {}