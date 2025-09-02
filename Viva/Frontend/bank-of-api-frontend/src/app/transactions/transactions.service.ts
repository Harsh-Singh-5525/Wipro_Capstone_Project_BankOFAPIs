import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class TransactionsService {
  private apiUrl = '/api/transaction';

  constructor(private http: HttpClient) {}

  createTransaction(transaction: {
    transactionType: string;
    amount: number;
    fromAccountId: number ;
    toAccountId: number;
  }) {
    return this.http.post(this.apiUrl, transaction);
  }
  getTransactions() {
  return this.http.get<any[]>('/api/transaction');
}
}
