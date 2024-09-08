import { Platform } from '@angular/cdk/platform';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {App} from '@capacitor/app'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'messwallaapp';
  constructor(private router: Router, private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    App.addListener('backButton', () => {
      // const url = this.router.url;
      // if (url === '/otp') {
      //   this.router.navigate(['/login']);
      // } else if (url === '/login') {
      //   App.exitApp();
      // } else {
        window.history.back();
      // }
    });
  }
}
