import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ContactDataToSave } from '../../models/contact.model';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  contacts: ContactDataToSave[];
  value = new FormControl('');

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.localStorageService.clear();
    this.localStorageService.initiateData();
    this.contacts = this.localStorageService.getAllItems();
    this.value.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value) {
          this.contacts = this.localStorageService
            .getAllItems()
            .filter(
              (el) =>
                el.data.firstName
                  .toLocaleLowerCase()
                  .includes(value.toLowerCase()) ||
                el.data.lastName
                  ?.toLocaleLowerCase()
                  .includes(value.toLowerCase())
            );
        } else {
          this.contacts = this.localStorageService.getAllItems();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
