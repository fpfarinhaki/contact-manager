import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Contact } from '../shared/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.get<Contact[]>('contacts').subscribe(data => {
      this.contacts = data;
    });
  }
  
}
