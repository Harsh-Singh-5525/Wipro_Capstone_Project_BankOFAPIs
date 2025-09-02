import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionListComponent } from './transaction-list.component';
import { TransactionsService } from '../transactions.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;
  let transactionsServiceMock: any;

  beforeEach(async () => {
    transactionsServiceMock = {
      getTransactions: jasmine.createSpy('getTransactions')
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, TransactionListComponent], 
      providers: [
        { provide: TransactionsService, useValue: transactionsServiceMock }
      ]
     
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load transactions on init', () => {
    const mockTxns = [{ transactionId: 1, amount: 100 }];
    transactionsServiceMock.getTransactions.and.returnValue(of(mockTxns));

    fixture.detectChanges();

    expect(component.transactions).toEqual(mockTxns);
    expect(component.errorMessage).toBe('');
  });

  it('should set errorMessage on service failure', () => {
    transactionsServiceMock.getTransactions.and.returnValue(throwError(() => new Error('fail')));

    fixture.detectChanges();

    expect(component.errorMessage).toBe('Failed to load transactions');
  });
});
