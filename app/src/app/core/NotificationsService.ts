import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject } from "rxjs";

export interface Notification {
    message: string;
    panelClass?: string;
    actionText?: string;
    actionCallback?: () => void;
    duration?: number;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    notificationSubject: Subject<Notification> = new Subject<Notification>();
    
    constructor(private snackBar: MatSnackBar) {
        this.notificationSubject.subscribe(notification => {
            this.showNotification(notification.message, notification.panelClass ?? 'default-notification', notification.actionText ?? 'Ok', notification.actionCallback, notification.duration);
        });
    }

    showNotification(message: string, panelClass: string = 'default-notification', actionText: string, actionCallback?: () => void, duration: number = 3000) {
        const config = new MatSnackBarConfig();
        config.panelClass = [panelClass];
        config.duration = duration;
        config.verticalPosition = 'top';
        const snackBarRef = this.snackBar.open(message, actionText ?? 'Ok', config);

        if (actionCallback) {
            snackBarRef.onAction().subscribe(() => {
                actionCallback();
                snackBarRef.dismiss();
            });
        }
    }

    triggerNotification(message: string, panelClass: string = 'default-notification', actionText?: string, actionCallback?: () => void, duration: number = 3000) {
        this.notificationSubject.next({message, panelClass, actionText, actionCallback, duration});
    }
}