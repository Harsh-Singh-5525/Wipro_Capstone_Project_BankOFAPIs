import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountRegisterComponent } from './account-register.component';
import { AccountsService } from '../account.service';
import { BanksService } from '../../banks/banks.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccountRegisterComponent', () => {
  let component: AccountRegisterComponent;
  let fixture: ComponentFixture<AccountRegisterComponent>;
  let accountsServiceMock: any;
  let banksServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    accountsServiceMock = {
      createAccount: jasmine.createSpy('createAccount').and.returnValue(of({}))
    };
    banksServiceMock = {
      getBanks: jasmine.createSpy('getBanks').and.returnValue(of([{ bankId: 1, bankName: 'Bank A' }]))
    };
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule,
        AccountRegisterComponent 
      ],
      providers: [
        { provide: AccountsService, useValue: accountsServiceMock },
        { provide: BanksService, useValue: banksServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load banks on init', () => {
    expect(component.banks.length).toBeGreaterThan(0);
  });

  it('should show error if required fields missing', () => {
    component.accountType = '';
    component.accountBalance = null;
    component.secretPassword = '';
    component.bankId = null;

    component.onSubmit();

    expect(component.errorMessage).toBe('Please fill all required fields.');
  });

  it('should create account and navigate on success', () => {
    component.accountType = 'SAVINGS';
    component.accountBalance = 1000;
    component.secretPassword = 'pass123';
    component.bankId = 1;

    component.onSubmit();

    expect(accountsServiceMock.createAccount).toHaveBeenCalled();
    expect(component.successMessage).toBe('Account created successfully!');
  });

  it('should show error on account creation failure', () => {
    accountsServiceMock.createAccount.and.returnValue(throwError(() => new Error('fail')));
    component.accountType = 'SAVINGS';
    component.accountBalance = 1000;
    component.secretPassword = 'pass123';
    component.bankId = 1;

    component.onSubmit();

    expect(component.errorMessage).toBe('Account creation failed. Please try again.');
  });
});
