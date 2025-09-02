import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

interface LoginResponse {
  token: string;
  userId?: number; 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private readonly userIdKey = 'user_id';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  private loginUrl = '/api/auth/login';
  private registerUrl = '/api/auth/register';

  constructor(private http: HttpClient) {}

  register(username: string, password: string, address: string) {
    return this.http.post(this.registerUrl, { username, password, address });
  }

  login(username: string, password:string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { username, password }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        if (response.userId !== undefined) {
          localStorage.setItem(this.userIdKey, response.userId.toString());
        }
        this.loggedIn.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getStoredUserId(): number | null {
    const id = localStorage.getItem(this.userIdKey);
    return id ? Number(id) : null;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  // Get userId or username from token 
  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const decoded = this.parseJwt(token);
    if (!decoded) return null;
    return decoded.sub || decoded.userId || null;
  }

  // New: Get username from JWT token "sub" claim
  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const decoded = this.parseJwt(token);
    if (!decoded) return null;
    return decoded.sub || null;
  }
}
