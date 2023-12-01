import { PersistanceService } from './persistance.service';
import {
  map,
  Observable,
  Subject,
  tap,
  catchError,
  of,
  throwError,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  LoginData,
  SelectItem,
  User,
  UserPurchaseInfo,
} from 'src/app/model/user';
import { environment } from 'src/environments/environment';
import { UserData } from 'src/app/model/token';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private baseUrl: string = `${environment.apiUrl}/user`;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  public loggedUser: any;
  public errorStatus$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  public loggedIn: boolean = false;
  userData$: BehaviorSubject<UserData> = new BehaviorSubject<UserData>(null);
  userPurchaseInfo$: BehaviorSubject<UserPurchaseInfo> =
    new BehaviorSubject<UserPurchaseInfo>(null);
  cities$: BehaviorSubject<SelectItem[]> = new BehaviorSubject<SelectItem[]>(
    []
  );

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _localStorage: PersistanceService
  ) {}

  registration(user: User) {
    const url = environment.production ? '' : `${this.baseUrl}/registration`;
    return this._http.post<UserData>(url, user).subscribe((userData) => {
        this.doLoginUser({...userData, newUser: true});
        this.errorStatus$.complete();
      },
      (error) => {
        this.errorStatus$.next(error);
      });
  }

  login(login: LoginData) {
    const url = environment.production ? '' : `${this.baseUrl}/login`;
    this._http
      .post<UserData>(url, login).subscribe(
        (userData) => {
          this.doLoginUser({...userData, newUser: false});
          if (userData.user.role !== 'admin') {
            const id = userData.user.id;
            this.getUserInfo(id);
          }
          this.errorStatus$.complete();
        },
        (error) => {
          this.errorStatus$.next(error);
        }
      );
  }

  logout() {
    const url = environment.production ? '' : `${this.baseUrl}/logout`;
    return this._http.post<UserData>(url, {}).subscribe((success) => {
      this.doLogoutUser();
    });
  }

  refresh() {
    const url = environment.production ? '' : `${this.baseUrl}/refreshToken`;
    return this._http.get<any>(url).pipe(
      tap((userData) => {
        this.userData$.next(userData);
      }),
      catchError((error) => {
        // does not catching error ang I can't proceed o logout
        console.log(error.error);
        this.doLogoutUser();
        return of(false);
      })
    );
  }

  getJwtToken() {
    return this._localStorage.get(this.JWT_TOKEN);
  }

  private doLoginUser(userData?: UserData) {
    this.userData$.next(userData);
    this.loggedUser = userData.user;
    this._localStorage.set(this.JWT_TOKEN, userData.accessToken);
    this.loggedIn = true;
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this._localStorage.remove(this.JWT_TOKEN);
    this.userData$.next(null);
    this._router.navigateByUrl('/auth');
  }

  getUserInfo(id: string) {
    const url = environment.production ? '' : `${this.baseUrl}/${id}`;
    this._http
      .get<UserPurchaseInfo>(url)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(err);
        })
      )
      .subscribe((success) => {
        this.userPurchaseInfo$.next(success);
      });
  }
}
