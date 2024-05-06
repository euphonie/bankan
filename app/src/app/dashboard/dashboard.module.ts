import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { TasksModule } from "../shared/tasks/tasks.module";
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [DashboardComponent],
    imports: [MatButtonModule, TasksModule, CommonModule],
    exports: [DashboardComponent]
})
export class DashboardModule {}