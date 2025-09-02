import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../account.service';
import { BanksService } from '../../banks/banks.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AccountRegisterComponent implements OnInit {
  accountType = '';
  accountBalance: number | null = null;
  secretPassword = '';
  bankId: number | null = null;

  banks: Array<{ bankId: number; name: string }> = [];

  errorMessage = '';
  successMessage = '';

  constructor(
    private accountsService: AccountsService,
    private banksService: BanksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.banksService.getBanks().subscribe({
      next: (data) => {
        this.banks = data.map(bank => ({
          bankId: bank.bankId,
          name: bank.bankName
        }));
      },
      error: () => (this.errorMessage = 'Failed to load banks')
    });
  }

  onSubmit(): void {
    if (!this.accountType || this.accountBalance === null || !this.secretPassword || !this.bankId) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.accountsService.createAccount({
      accountType: this.accountType,
      accountBalance: this.accountBalance,
      secretPassword: this.secretPassword,
      bank: { bankId: this.bankId }
    }).subscribe({
      next: () => {
        this.successMessage = 'Account created successfully!';
        setTimeout(() => this.router.navigate(['/accounts']), 2000);
      },
      error: () => {
        this.errorMessage = 'Account creation failed. Please try again.';
      }
    });
  }
}
