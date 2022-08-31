import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Contact } from '../shared/contact.model';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  loading: Boolean = false;
  newContact!: Contact | null;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(contactForm: NgForm): void {
    this.loading = true;

    const formValues = Object.assign({}, contactForm.value);

    const contact: Contact = {
      name: `${formValues.firstName} ${formValues.lastName}`,
      address: formValues.address,
      phone: `${formValues.areaCode} ${formValues.phone}`,
      photoUrl: formValues.photo
    };

    this.apiService.post<Contact,Contact>('contacts', contact)
    .subscribe(data => {
      contactForm.reset();
      this.loading = false;
      this.newContact = contact;  
    });
  };
}
