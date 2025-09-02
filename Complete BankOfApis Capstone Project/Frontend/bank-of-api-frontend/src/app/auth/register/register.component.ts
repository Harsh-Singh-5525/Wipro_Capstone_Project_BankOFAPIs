import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class RegisterComponent {
  username = '';
  password = '';
  address = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.username, this.password, this.address).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Please open your account.';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/account-register']), 2000);
      },
      error: err => {
        this.errorMessage = 'Registration failed. Please try again.';
        this.successMessage = '';
        console.error(err);
      }
    });
  }
}
