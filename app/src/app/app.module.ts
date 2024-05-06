import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { SharedModule } from "./shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { DashboardModule } from "./dashboard/dashboard.module";
import { tasksReducer } from "./shared/tasks/tasks.reducers";
import { TasksEffects } from "./shared/tasks/tasks.effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { statusesReducer } from "./shared/statuses/statuses.reducers";
import { StatusesEffects } from "./shared/statuses/statuses.effects";
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({
            tasks: tasksReducer,
            statuses: statusesReducer,
        }),
        EffectsModule.forRoot([TasksEffects, StatusesEffects]),
        DashboardModule,
        SharedModule,
        HttpClientModule,
        StoreDevtoolsModule.instrument({
            name: 'DevTools & Debugging in NgRx',
            maxAge: 25, // Retains last 25 states
            logOnly: true, // Restrict extension to log-only mode
          }),
    ],
    providers: [provideAnimationsAsync(), {
        provide: MAT_DIALOG_DEFAULT_OPTIONS, 
        useValue: {
            height: '500px',
            width: '500px',
            autoFocus: true,
        }
    }],
    bootstrap: [AppComponent]
})
export class AppModule {}