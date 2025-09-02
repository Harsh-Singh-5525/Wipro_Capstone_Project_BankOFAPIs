import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountsService } from '../account.service';

@Component({
  standalone: true,
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
  imports: [CommonModule, RouterModule]
})
export class AccountListComponent implements OnInit {
  accounts: any[] = [];
  errorMessage = '';

  constructor(private accountsService: AccountsService) {}

  ngOnInit(): void {
    this.accountsService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
      },
      error: () => {
        this.errorMessage = 'Failed to load accounts';
      }
    });
  }
}
