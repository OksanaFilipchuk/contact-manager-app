import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsListComponent } from './contacts-manager/components/contacts-list/contacts-list.component';
import { CreateEditContactComponent } from './contacts-manager/components/create-edit-contact/create-edit-contact.component';
import { ContactViewComponent } from './contacts-manager/components/contact-view/contact-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactsListComponent },
  { path: 'contacts/create-contact', component: CreateEditContactComponent },
  { path: 'contacts/:id', component: ContactViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
