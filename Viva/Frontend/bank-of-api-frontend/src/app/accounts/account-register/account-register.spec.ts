import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRegister } from './account-register';

describe('AccountRegister', () => {
  let component: AccountRegister;
  let fixture: ComponentFixture<AccountRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
