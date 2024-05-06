import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { loadTasksFailure, loadTasksSuccess, loadTasks } from "./tasks.actions";
import { TaskService } from "./tasks.service";

@Injectable()
export class TasksEffects {
    
    loadTasks$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadTasks),
            mergeMap(() => 
            this.taskService.getTasks().pipe(
                map(tasks => loadTasksSuccess({tasks})),
                catchError(error => of(loadTasksFailure({error})))
            ))
        )
    );
    
    constructor(private actions$: Actions, private taskService: TaskService) {}
}