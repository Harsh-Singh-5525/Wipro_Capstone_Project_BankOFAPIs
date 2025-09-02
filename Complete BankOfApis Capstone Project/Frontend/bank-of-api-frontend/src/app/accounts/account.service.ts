import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AccountCreateRequest {
  accountType: string;
  accountBalance: number;
  secretPassword: string;
  bank: { bankId: number };
}

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private apiUrl = '/api/accounts'; // will be proxied

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createAccount(request: AccountCreateRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, request);
  }
}
