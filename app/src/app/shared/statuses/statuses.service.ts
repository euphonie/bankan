import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Status } from "./statuses.model";

@Injectable({
    providedIn: 'root'
})
export class StatusService {
    private apiUrl = `${environment.apiUrl}/status/`;

    constructor(private http: HttpClient){}

    getStatuses(): Observable<Status[]> {
        return this.http.get<Status[]>(this.apiUrl);
    }
}