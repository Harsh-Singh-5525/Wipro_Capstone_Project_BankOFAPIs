import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BanksService {
  private apiUrl = '/api/banks';

  constructor(private http: HttpClient) {}

  getBanks(): Observable<Array<{ bankId: number; bankName: string; ifscCode: string }>> {
    return this.http.get<Array<{ bankId: number; bankName: string; ifscCode: string }>>(this.apiUrl);
  }

  getBankById(bankId: number): Observable<{ bankId: number; bankName: string; ifscCode: string }> {
    return this.http.get<{ bankId: number; bankName: string; ifscCode: string }>(`${this.apiUrl}/${bankId}`);
  }
}
