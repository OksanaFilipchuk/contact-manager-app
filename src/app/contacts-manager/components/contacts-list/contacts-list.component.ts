import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormControl } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
import { ContactDataToSave } from '../../models/contact.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  contacts: ContactDataToSave[];
  value = new FormControl('');

  constructor(
    private localStorageService: LocalStorageService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.contacts = this.localStorageService.getAllItems();
    this.value.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value) {
          this.contacts = this.localStorageService
            .getAllItems()
            .filter(
              (el) =>
                `${el.data.firstName} ${el.data.lastName}`
                  .toLocaleLowerCase()
                  .includes(value.toLowerCase()) ||
                `${el.data.lastName} ${el.data.firstName}`
                  ?.toLocaleLowerCase()
                  .includes(value.toLowerCase())
            );
        } else {
          this.contacts = this.localStorageService.getAllItems();
        }
      });
  }

  deleteContact(id: number) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          question: 'Are you sure you want to delete this contact?',
          title: 'Delete contact',
        },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this.localStorageService.removeItem(id.toString());
          this.contacts = this.contacts.filter((el) => el.id !== id);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
