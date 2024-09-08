import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-addnewmember',
  standalone: true,
  imports: [
    CommonModule,            
      ReactiveFormsModule,    
      MatCardModule,          
      MatFormFieldModule,     
      MatInputModule,         
      MatButtonModule,
  ],
  templateUrl: './addnewmember.component.html',
  styleUrl: './addnewmember.component.scss'
})
export class AddnewmemberComponent {
  addMemberForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addMemberForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addMemberForm.valid) {
      console.log('Form Submitted', this.addMemberForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
