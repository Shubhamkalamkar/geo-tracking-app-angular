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
import { PushNotifications } from '@capacitor/push-notifications'; // Import Push Notifications

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [MatButtonModule, MatProgressSpinnerModule],
  providers: [LocationAccuracy], // Register LocationAccuracy service
})
export class LoginComponent implements OnInit {
  lat!: number;
  lon!: number;
  address!: string;
  isLoading = false;

  constructor(
    private auth: AuthService,
    private locationAccuracy: LocationAccuracy,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
     // Check Notification Permission on Init
  }

  /**
   * 1️⃣ Check Notification Permission
   */
  async checkNotificationPermission() {
    console.log("checking permission")
    const status = await PushNotifications.checkPermissions();
    console.log('Notification permission:', status);

    if (status.receive !== 'granted') {
      // If permission is not granted, request permission
      const requestStatus = await PushNotifications.requestPermissions();
      if (requestStatus.receive !== 'granted') {
        this.toastr.warning(
          'Please enable notifications from settings',
          'Notification Permission'
        );
        await this.openSettings(true); // Redirect to App Settings
      }
    }
  }

  /**
   * 2️⃣ Check Location Permission and Fetch Location
   */
  getCurrentLocation = async () => {
    this.isLoading = true; // Show spinner

    try {
      const permissionStatus = await Geolocation.checkPermissions();
      await this.checkNotificationPermission();
      console.log('Location Permission:', permissionStatus.location);

      if (permissionStatus?.location !== 'granted') {
        const requestStatus = await Geolocation.requestPermissions();
        if (requestStatus.location !== 'granted') {
          await this.openSettings(true); // Open settings if permission is denied
          this.isLoading = false;
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
          this.isLoading = false;
        },
        error: (err) => {
          console.log('Error fetching address:', err);
          this.toastr.error('Failed to fetch address', 'Error');
          this.isLoading = false;
        },
      });
    } catch (e: any) {
      console.log('Location error:', e);
      if (e?.message === 'Location services are not enabled') {
        await this.openSettings();
      }
      this.toastr.error('Failed to fetch location', 'Error');
      this.isLoading = false;
    }
  };

  /**
   * 3️⃣ Open Native Settings (Location or App Settings)
   */
  openSettings = (app = false) => {
    console.log('Opening settings...');
    return NativeSettings.open({
      optionAndroid: app
        ? AndroidSettings.ApplicationDetails
        : AndroidSettings.Location,
      optionIOS: app ? IOSSettings.App : IOSSettings.LocationServices,
    });
  };

  /**
   * 4️⃣ Enable GPS on Android Devices
   */
  async enableGps() {
    const canRequest = await this.locationAccuracy.canRequest();
    if (canRequest) {
      await this.locationAccuracy.request(
        this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY
      );
    }
  }
}
