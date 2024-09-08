import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIcon } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-enterotp',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './enterotp.component.html',
  styleUrl: './enterotp.component.scss',
})
export class EnterotpComponent implements OnInit {
  otpForm: FormGroup;
  mobileNumber: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private toaster: ToastrService
  ) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });
  }

  ngOnInit(): void {
    this.mobileNumber = this.auth.mobileNumber;
  }

  trimNumber(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    if (input.length > 6) {
      this.otpForm.patchValue({
        otp: input.slice(0, 6),
      });
    }
  }

  editMobileNumber() {
    this.router.navigate(['login']);
  }

  onSubmit() {
    if (this.otpForm.invalid) return;

    this.toaster.success('Login Successful');
    this.router.navigate(['usertype'])
  }
}
