import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountListComponent } from './account-list.component';
import { AccountsService } from '../account.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccountListComponent', () => {
  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;
  let accountsServiceMock: any;

  beforeEach(async () => {
    accountsServiceMock = {
      getAccounts: jasmine.createSpy('getAccounts')
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule, 
        AccountListComponent
      ],
      providers: [
        { provide: AccountsService, useValue: accountsServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load accounts on init', () => {
    const mockAccounts = [{ accountId: 1 }];
    accountsServiceMock.getAccounts.and.returnValue(of(mockAccounts));

    fixture.detectChanges();

    expect(component.accounts).toEqual(mockAccounts);
    expect(component.errorMessage).toBe('');
  });

  it('should set errorMessage on service failure', () => {
    accountsServiceMock.getAccounts.and.returnValue(throwError(() => new Error('fail')));

    fixture.detectChanges();

    expect(component.errorMessage).toBe('Failed to load accounts');
  });
});
