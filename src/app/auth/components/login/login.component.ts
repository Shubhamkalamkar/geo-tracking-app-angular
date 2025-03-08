import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  AndroidSettings,
  IOSSettings,
  NativeSettings,
} from 'capacitor-native-settings';
import { Capacitor } from '@capacitor/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [MatButtonModule, MatProgressSpinnerModule],
  providers: [LocationAccuracy], // Register LocationAccuracy service
})
export class LoginComponent implements OnInit {
  data: any;
  apiKey = 'AIzaSyCETLJX9DlukF8lkqybi9j3dH_DoIn_FeM';
  lat!: number;
  lon!: number;
  address!: string;
  isLoading = false;
  constructor(
    private auth: AuthService,
    private locationAccuracy: LocationAccuracy,
    private toastr: ToastrService
  ) {}
  // key = AIzaSyCETLJX9DlukF8lkqybi9j3dH_DoIn_FeM          // AIzaSyCETLJX9DlukF8lkqybi9j3dH_DoIn_FeM
  ngOnInit(): void {
    // this.checkLocationEnabled();
  }

  getCurrentLocation = async () => {
    this.isLoading = true; // Show spinner

    try {
      const permissionStatus = await Geolocation.checkPermissions();
      console.log('Permission status: ', permissionStatus.location);

      if (permissionStatus?.location !== 'granted') {
        const requestStatus = await Geolocation.requestPermissions();
        if (requestStatus.location !== 'granted') {
          await this.openSettings(true); // Open settings if permission is denied
          this.isLoading = false; // Hide spinner on failure
          return;
        }
      }

      if (Capacitor.getPlatform() === 'android') {
        await this.enableGps();
      }

      const options: PositionOptions = {
        maximumAge: 3000,
        timeout: 10000,
        enableHighAccuracy: true,
      };

      const position = await Geolocation.getCurrentPosition(options);
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;

      this.auth.getAddress(this.lat, this.lon).subscribe({
        next: (data) => {
          console.log('Address:', data);
          this.address = data.display_name;
          this.isLoading = false; // Hide spinner after successful response
        },
        error: (err) => {
          console.log('Error fetching address:', err);
          this.toastr.error('Failed to fetch address', 'Error'); // Show error message
          this.isLoading = false; // Hide spinner on error
        },
      });
    } catch (e: any) {
      console.log('Location error:', e);
      if (e?.message === 'Location services are not enabled') {
        await this.openSettings();
      }
      this.toastr.error('Failed to fetch location', 'Error'); // Show error notification
      this.isLoading = false; // Hide spinner on exception
    }
  };

  openSettings = (app = false) => {
    console.log('open settings...');
    return NativeSettings.open({
      optionAndroid: app
        ? AndroidSettings.ApplicationDetails
        : AndroidSettings.Location,
      optionIOS: app ? IOSSettings.App : IOSSettings.LocationServices,
    });
  };

  async enableGps() {
    const canRequest = await this.locationAccuracy.canRequest();
    if (canRequest) {
      await this.locationAccuracy.request(
        this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY
      );
    }
  }
}
