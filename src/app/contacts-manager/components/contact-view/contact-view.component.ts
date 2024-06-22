import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { ContactData } from '../../models/contact.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss'],
})
export class ContactViewComponent implements OnInit {
  contactId: string | null = null;
  contact: ContactData | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private matdialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id');
    if (this.contactId) {
      this.contact = JSON.parse(
        this.localStorageService.getItem(this.contactId) || ''
      );
    }
  }

  openDialog() {
    this.matdialog
      .open(ConfirmDialogComponent, {
        data: {
          question: 'Are you sure you want to delete this contact?',
          title: 'Delete contact',
        },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (res && this.contactId) {
          this.localStorageService.removeItem(this.contactId.toString());
          this.router.navigate(['contacts']);
        }
      });
  }
}
