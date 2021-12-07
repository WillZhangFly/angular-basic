import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTBkwi-R3_VhqmgLGi0wqZXyhZKjhoY1k',
      {
        email,
        password,
        returnSecureToken: true,
      }
    ).pipe(
      catchError(
        errorResponse => {
          let errorMessage = 'An unknown error occurred!';
          switch(errorResponse?.error?.error?.message){
             case 'EMAIL_EXISTS':
               errorMessage = 'This email exists already';
          }

          return throwError(errorMessage);
        }
      )
    );
  }
}

