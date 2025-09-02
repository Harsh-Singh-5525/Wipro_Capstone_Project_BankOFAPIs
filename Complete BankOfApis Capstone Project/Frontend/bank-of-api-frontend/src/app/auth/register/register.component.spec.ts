import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      register: jasmine.createSpy('register')
    };
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule,
        RegisterComponent 
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.register and navigate on success', () => {
    authServiceMock.register.and.returnValue(of({}));
    component.username = 'newuser';
    component.password = 'newpass';
    component.address = 'address';

    component.onSubmit();

    expect(authServiceMock.register).toHaveBeenCalledWith('newuser', 'newpass', 'address');
    expect(component.successMessage).toContain('Registration successful');
    expect(component.errorMessage).toBe('');
  });

  it('should set errorMessage on registration failure', () => {
    authServiceMock.register.and.returnValue(throwError(() => new Error('fail')));

    component.onSubmit();

    expect(component.errorMessage).toBe('Registration failed. Please try again.');
    expect(component.successMessage).toBe('');
  });
});
