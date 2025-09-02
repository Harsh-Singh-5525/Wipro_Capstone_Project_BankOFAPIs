import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionsService } from '../transactions.service';
import { AccountsService } from '../../accounts/account.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css'],
  imports: [CommonModule, FormsModule]
})
export class TransactionCreateComponent implements OnInit {
  transactionType = 'Transfer';
  amount: number | null = null;
  fromAccountId: number | null = null;
  toAccountId: number | null = null;

  userAccounts: any[] = [];

  errorMessage = '';
  successMessage = '';

  constructor(
    private transactionsService: TransactionsService,
    private accountsService: AccountsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountsService.getAccounts().subscribe({
      next: (accounts) => {
        this.userAccounts = accounts;
      },
      error: () => {
        this.errorMessage = 'Failed to load accounts';
      }
    });
  }

  onSubmit(): void {
    if (
      !this.transactionType ||
      this.amount === null ||
      this.fromAccountId === null ||
      this.toAccountId === null
    ) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    const fromId = Number(this.fromAccountId);
    const toId = Number(this.toAccountId);

    if (fromId === toId) {
      this.errorMessage = 'From and To account cannot be the same.';
      return;
    }

    
    const userId = fromId;

    if (!userId) {
      this.errorMessage = 'User not authenticated properly.';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    const transactionPayload = {
      transactionType: this.transactionType,
      amount: this.amount,
      fromAccountId: fromId,
      toAccountId: toId,
      userId: userId  
    };
    console.log('Transaction payload:', transactionPayload);

    this.transactionsService.createTransaction(transactionPayload).subscribe({
      next: () => {
        this.successMessage = 'Transaction created successfully!';
        setTimeout(() => this.router.navigate(['/transactions']), 2000);
      },
      error: () => {
        this.errorMessage = 'Transaction creation failed. Please try again.';
      }
    });
  }
}
