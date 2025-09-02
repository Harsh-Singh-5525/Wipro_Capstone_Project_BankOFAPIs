import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jasmine.createSpy('login')
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule.withRoutes([]), 
        LoginComponent 
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login and navigate on success', () => {
    authServiceMock.login.and.returnValue(of({}));
    component.username = 'user1';
    component.password = 'pass1';

    component.onSubmit();

    expect(authServiceMock.login).toHaveBeenCalledWith('user1', 'pass1');
    
    expect(component.errorMessage).toBe('');
  });

  it('should set errorMessage on login failure', () => {
    authServiceMock.login.and.returnValue(throwError(() => new Error('login failed')));

    component.onSubmit();

    expect(component.errorMessage).toBe('Invalid username or password');
  });
});
