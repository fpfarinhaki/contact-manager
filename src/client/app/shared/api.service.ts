import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/client/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer ' + this.auth.getToken()
  }); 

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`, { headers: this.headers});
  };

  post<T,U>(url: string, body: U): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${url}`, body, {headers: this.headers});
  };

  put<T,U>(url: string, body: U): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${url}`, body, {headers: this.headers});
  };

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${url}`, {headers: this.headers});
  }
}
