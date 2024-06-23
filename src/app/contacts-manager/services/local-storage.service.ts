import { Injectable, OnInit } from '@angular/core';
import { initData } from '../initDB';
import { ContactData, ContactDataToSave } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  initiateData() {
    initData.forEach((el, index) => {
      if (!Object.keys(localStorage).includes((index + 1).toString()))
        this.setItem((index + 1).toString(), JSON.stringify(el));
    });
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  getAllItems(): ContactDataToSave[] {
    const contacts = [] as ContactDataToSave[];
    Object.keys(localStorage).forEach((key) => {
      const contact = {
        id: Number(key),
        data: { ...JSON.parse(this.getItem(key) || '') },
      };
      contacts.push(contact);
    });
    return contacts;
  }

  clear(): void {
    localStorage.clear();
  }
}
