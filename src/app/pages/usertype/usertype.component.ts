import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usertype',
  standalone: true,
  imports: [],
  templateUrl: './usertype.component.html',
  styleUrl: './usertype.component.scss',
})
export class UsertypeComponent {
  constructor(private router: Router) {}
  selectUserType(type: string) {
    console.log(`${type} selected`);
    if (type == 'customer') {
      this.router.navigate(['dashboard']);
    }
    else{
      this.router.navigate(['enterShopDetails']);
    }
  }
}
