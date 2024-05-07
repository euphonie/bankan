import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { loadTasksFailure, loadTasksSuccess, loadTasks, addTask, addTaskSuccess, addTaskFailure, editTaskFailure, editTaskSuccess, editTask, softDeleteTask, softDeleteTaskSuccess, softDeleteTaskFailure } from "./tasks.actions";
import { TaskService } from "./tasks.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Task, TaskDto } from "./tasks.model";

@Injectable()
export class TasksEffects {

    loadTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTasks),
            mergeMap(() =>
                this.taskService.getTasks().pipe(
                    map((tasks: TaskDto[]) => {
                        const mappedTasks = tasks.map(task => this.dtoToModel(task));
                        return loadTasksSuccess({ tasks: mappedTasks })
                    }),
                    catchError((error: HttpErrorResponse) => of(loadTasksFailure({ error })))
                ))
        )
    );

    addTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addTask),
            switchMap(action =>
                this.taskService.addTask(this.modelToDto(action.task)).pipe(
                    map((task: TaskDto) => {return addTaskSuccess({ task: this.dtoToModel(task) })}),
                    catchError(error => of(addTaskFailure({ error })))
                )
            )
        )
    );

    editTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(editTask),
            switchMap(action =>
                this.taskService.editTask(this.modelToDto(action.task)).pipe(
                    map((task: TaskDto) => {return editTaskSuccess({ task: this.dtoToModel(task) })}),
                    catchError(error => of(editTaskFailure({ error })))
                )
            )
        )
    );

    softDeleteTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(softDeleteTask),
            switchMap(action =>
                this.taskService.editTask(
                    this.modelToDto({
                        ...action.task,
                        deleted_at: new Date(),
                    })
                ).pipe(
                    map((task: TaskDto) => {return softDeleteTaskSuccess({ task: this.dtoToModel(task) })}),
                    catchError(error => of(softDeleteTaskFailure({ error })))
                )
            )
        )
    );

    dtoToModel = (taskDto: TaskDto) : Task =>
         ({
            ...taskDto,
            statusId: taskDto.status,
            status: undefined
        });
    
    modelToDto = (task: Task): TaskDto => 
        ({
            ...task,
            status: task.statusId
        })


    constructor(private actions$: Actions, private taskService: TaskService) { }
}