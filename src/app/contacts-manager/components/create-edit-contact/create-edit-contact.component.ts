import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-edit-contact',
  templateUrl: './create-edit-contact.component.html',
  styleUrls: ['./create-edit-contact.component.scss'],
})
export class CreateEditContactComponent implements OnInit {
  submitButtonName = '';

  constructor(
    private readonly adapter: DateAdapter<Date>,
    private router: Router
  ) {
    this.adapter.setLocale('UA');
  }

  ngOnInit(): void {
    this.submitButtonName = this.router.url.includes('create-contact')
      ? 'Create'
      : 'Save';
  }
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
    address: new FormControl(''),
    birthday: new FormControl(''),
    additionalInfo: new FormControl('', [Validators.maxLength(100)]),
  });
}
