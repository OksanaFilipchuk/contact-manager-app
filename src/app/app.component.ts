import { Component } from '@angular/core';
import { LocalStorageService } from './contacts-manager/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private localStorageService: LocalStorageService) {
    this.localStorageService.initiateData();
  }
}
