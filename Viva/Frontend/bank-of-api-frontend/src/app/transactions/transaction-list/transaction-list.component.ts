import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsService } from '../transactions.service';

@Component({
  standalone: true,
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
  imports: [CommonModule]
})
export class TransactionListComponent implements OnInit {
  transactions: any[] = [];
  errorMessage = '';

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionsService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load transactions';
      }
    });
  }
}
