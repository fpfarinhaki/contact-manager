import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showAlert = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    if(this.auth.isLoggedIn()) {
      this.router.navigate(['/contacts']);
    }

  }

  onSubmit(form: NgForm) {
    const values = form.value;

    const payload = {
      username: values.username,
      password: values.password
    };

    this.apiService.post<any,any>('authenticate', payload)
      .subscribe(
        {
          next: (data) => {
            this.auth.setToken(data.token);
            this.showAlert = false;
          },
          error: (e) => {
            console.log(e);
            this.showAlert = true;
          },
          complete: () => {
            this.router.navigate(['/contacts']);
            window.location.reload();
          }
        });
  }
}
