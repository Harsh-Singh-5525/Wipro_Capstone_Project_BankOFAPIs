import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionCreateComponent } from './transaction-create.component';
import { TransactionsService } from '../transactions.service';
import { AccountsService } from '../../accounts/account.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('TransactionCreateComponent', () => {
  let component: TransactionCreateComponent;
  let fixture: ComponentFixture<TransactionCreateComponent>;
  let transactionsServiceMock: any;
  let accountsServiceMock: any;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    transactionsServiceMock = {
      createTransaction: jasmine.createSpy('createTransaction').and.returnValue(of({}))
    };
    accountsServiceMock = {
      getAccounts: jasmine.createSpy('getAccounts').and.returnValue(of([{ accountId: 1 }]))
    };
    authServiceMock = {};
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, TransactionCreateComponent],
      providers: [
        { provide: TransactionsService, useValue: transactionsServiceMock },
        { provide: AccountsService, useValue: accountsServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user accounts on init', () => {
    expect(component.userAccounts.length).toBeGreaterThan(0);
  });

  it('should show error if required fields missing', () => {
    component.amount = null;
    component.fromAccountId = null;
    component.toAccountId = null;
    component.onSubmit();
    expect(component.errorMessage).toBe('Please fill all required fields.');
  });

  it('should call createTransaction and navigate on success', () => {
    component.amount = 100;
    component.fromAccountId = 1;
    component.toAccountId = 2;

    component.onSubmit();

    expect(transactionsServiceMock.createTransaction).toHaveBeenCalled();
    expect(component.successMessage).toBe('Transaction created successfully!');
  });

  it('should show error on transaction create failure', () => {
    transactionsServiceMock.createTransaction.and.returnValue(throwError(() => new Error('fail')));
    component.amount = 100;
    component.fromAccountId = 1;
    component.toAccountId = 2;

    component.onSubmit();

    expect(component.errorMessage).toBe('Transaction creation failed. Please try again.');
  });
});
