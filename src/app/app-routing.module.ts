import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactSearchFormComponent } from './contacts-manager/components/contact-search-form/contact-search-form.component';
import { CreateEditContactComponent } from './contacts-manager/components/create-edit-contact/create-edit-contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactSearchFormComponent },
  { path: 'contacts/create-contact', component: CreateEditContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
