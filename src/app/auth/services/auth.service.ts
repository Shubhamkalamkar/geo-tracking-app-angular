import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiSuccessResponse } from '../../interfaces/api-response-success.interface';
import { environment } from '../../../environment/environment';
import { ILoginApiRequestData } from '../interfaces/login-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  mobileNumber: any = '';
  constructor(private http: HttpClient) {}

  sendOtp = (data:ILoginApiRequestData) => {
    return this.http.post<IApiSuccessResponse>(environment.baseUrl + 'auth/getOtp', data);
  };
}
