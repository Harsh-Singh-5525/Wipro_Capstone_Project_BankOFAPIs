import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { AccountListComponent } from './accounts/account-list/account-list.component';
import { RegisterComponent } from './auth/register/register.component';
import { AccountRegisterComponent } from './accounts/account-register/account-register.component';
import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';
import { TransactionCreateComponent } from './transactions/transaction-create/transaction-create.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'accounts', component: AccountListComponent },
  { path: 'transactions', component: TransactionListComponent },
  { path: 'transaction-create', component: TransactionCreateComponent },
   { path: 'account-register', component: AccountRegisterComponent },
   { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
