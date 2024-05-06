import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TaskDto } from "./tasks.model";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUrl = `${environment.apiUrl}/tasks/`;

    constructor(private http: HttpClient) {}

    getTasks(): Observable<TaskDto[]> {
        return this.http.get<TaskDto[]>(this.apiUrl);
    }

    addTask(task: TaskDto): Observable<TaskDto> {
        return this.http.post<TaskDto>(this.apiUrl, task);
    }

    editTask(task: TaskDto): Observable<TaskDto> {
        const editUrl = `${this.apiUrl}${task.id}/`;
        return this.http.put<TaskDto>(editUrl, task);
    }
}