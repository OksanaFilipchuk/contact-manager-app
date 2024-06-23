import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactViewComponent } from './contact-view.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContactViewComponent', () => {
  let component: ContactViewComponent;
  let fixture: ComponentFixture<ContactViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactViewComponent],
      providers: [
        { provide: LocalStorageService, useValue: {} },
        { provide: MatDialog, useValue: { open: () => of(true) } },
      ],
      imports: [
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatNativeDateModule,
        MatDialogModule,
        RouterTestingModule,
      ],
    });
    fixture = TestBed.createComponent(ContactViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
