import { Component } from '@angular/core';
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

@Component({
  selector: 'app-enter-shop-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './enter-shop-details.component.html',
  styleUrl: './enter-shop-details.component.scss',
})
export class EnterShopDetailsComponent {
  shopDetails: FormGroup;

  constructor(private fb: FormBuilder, private router:Router) {
    this.shopDetails = this.fb.group({
      shopName: ['', Validators.required],
      shopAddress: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]], // Validating for 6 digits
      shopType: ['', Validators.required],
    });
  }

  trimNumber(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    if (input.length > 6) {
      this.shopDetails.patchValue({
        pincode: input.slice(0, 6),
      });
    }
  }

  onSubmit() {
    if (this.shopDetails.invalid) {
      return;
    }
    console.log('Shop Details:', this.shopDetails.value);
    this.router.navigate(['dashboard'])
  }
}
