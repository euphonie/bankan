import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { loadStatuses, loadStatusesFailure, loadStatusesSuccess } from "./statuses.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { StatusService } from "./statuses.service";

@Injectable()
export class StatusesEffects {

    loadStatuses$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadStatuses),
            mergeMap(() => 
                this.statusService.getStatuses().pipe(
                    map(statuses => loadStatusesSuccess({ statuses })),
            catchError((error: HttpErrorResponse) => of(loadStatusesFailure({ error })))
                )
            )
        )
    );

    constructor(private actions$: Actions, private statusService: StatusService) {}
}