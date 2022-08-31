import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  storageKey: string = 'contact-manager-jwt';

  constructor(
    private router: Router
  ) { }

  setToken(token: string) {
    localStorage.setItem(this.storageKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void{
    localStorage.removeItem(this.storageKey);
    localStorage.clear();
    window.location.reload();
    this.router.navigate(['/login']);
  }

}
