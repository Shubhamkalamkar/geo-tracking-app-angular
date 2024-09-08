import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
    });
  }
  ngOnInit(): void {
    this.loginForm.patchValue({
      mobileNumber: this.auth.mobileNumber,
    });
  }

  trimNumber(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    if (input.length > 10) {
      this.loginForm.patchValue({
        mobileNumber: input.slice(0, 10),
      });
    }
  }

  // Handle form submission
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.auth.mobileNumber = this.loginForm.value.mobileNumber;

    this.auth.sendOtp(this.loginForm.value).subscribe({
      next: (response) => {
        this.toastr.success('Otp send successfully!');
        this.router.navigate(['verifyOTP']);
      },
      error: (err) => {
        console.log("error",err)
        this.toastr.error(err);
      },
    });
  }
}
