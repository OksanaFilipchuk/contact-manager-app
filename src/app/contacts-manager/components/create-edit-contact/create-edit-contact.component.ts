import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-edit-contact',
  templateUrl: './create-edit-contact.component.html',
  styleUrls: ['./create-edit-contact.component.scss'],
})
export class CreateEditContactComponent implements OnInit {
  isCreate: boolean;
  submitButtonName = '';
  contactIdToUpdate: string | null;
  contactForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[- +()0-9]+$'),
    ]),
    secondaryPhone: new FormControl('', [Validators.pattern('^[- +()0-9]+$')]),
    address: new FormControl('', [Validators.maxLength(30)]),
    birthday: new FormControl(''),
    additionalInfo: new FormControl('', [Validators.maxLength(100)]),
  });

  constructor(
    private readonly adapter: DateAdapter<Date>,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    readonly snackBar: MatSnackBar
  ) {
    this.adapter.setLocale('UA');
  }

  ngOnInit(): void {
    this.isCreate = this.router.url.includes('create-contact');
    this.submitButtonName = this.isCreate ? 'Create' : 'Save';
    this.contactIdToUpdate = this.route.snapshot.paramMap.get('id');
    if (this.contactIdToUpdate) {
      this.setFormValues(this.contactIdToUpdate);
    }
  }

  setFormValues(id: string): void {
    const contact = JSON.parse(this.localStorageService.getItem(id) || '');
    if (contact) {
      Object.keys(contact).forEach((key) => {
        this.contactForm.patchValue({ [key]: contact[key] });
      });
    }
  }

  onFormSubmit(): void {
    this.isCreate ? this.createContact() : this.updateContact();
  }

  private createContact(idToUpdate?: string): void {
    const keys = Object.keys(localStorage).map((el) => +el);
    const id = idToUpdate || Math.max(...keys) + 1;
    this.localStorageService.setItem(
      id.toString(),
      JSON.stringify(this.contactForm.value)
    );
    this.snackBar.open(
      idToUpdate ? 'Contact has been updated' : 'Contact has been created',
      'Close',
      { duration: 2000, verticalPosition: 'top' }
    );
    this.contactForm.reset();
  }

  private updateContact(): void {
    if (this.contactIdToUpdate) {
      this.localStorageService.removeItem(this.contactIdToUpdate);
      this.createContact(this.contactIdToUpdate);
    }
  }
}
