import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { 
  }

  authenticate(): void {
    if(this.auth.isLoggedIn()) {
      this.auth.logout();
    } else {
      this.router.navigate(['/login']);
    }
  }
}
