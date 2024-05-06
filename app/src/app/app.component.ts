import { Component, OnInit } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private store: Store<AppState>) {}

  ngOnInit() : void {
    
  }
}
