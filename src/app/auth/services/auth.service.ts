import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiSuccessResponse } from '../../interfaces/api-response-success.interface';
import { environment } from '../../../environment/environment';
import { ILoginApiRequestData } from '../interfaces/login-request.interface';
import { Geolocation } from '@capacitor/geolocation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  mobileNumber: any = '';
  constructor(private http: HttpClient) {}

  getAddress = (latitude: number, longitude: number): Observable<any> => {
    //https://nominatim.openstreetmap.org/reverse?format=json&lat=18.6084087&lon=73.9145836
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    return this.http.get(url);
  };
}
