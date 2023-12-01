import { NavigationEnd, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, ReplaySubject, takeUntil } from 'rxjs';
import { AuthenticationService } from './pages/authentication/services/authentication.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  title = 'wine-store';
  showLogout: boolean = false;
  display: boolean = false;
  cartButton: boolean = false;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(
    private _authService: AuthenticationService,
    private _router: Router
  ) {}

  displayCart() {
    this.display = !this.display;
  }

  ngOnInit() {
    fetch(`${environment.apiUrl}/user/refreshToken`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((x) => x.json())
      .then((x) => {
        if (x.user) {
          this.showLogout = true;
          this._authService.userData$.next(x);
          if (x.user.role == 'admin') {
            this.cartButton = false;
          } else if (x.user.role !== 'admin') {
            this.cartButton = true;
            this._authService.getUserInfo(x.user.id);
          }
        }
      });
    this.buttonHandler();
  }

  buttonHandler() {
    this._authService.userData$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((success) => {
        if (success) {
          this.showLogout = true;
        } else {
          this.showLogout = false;
        }
      });
    this._router.events
      .pipe(takeUntil(this.destroyed$))
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          if (event.url == '/shop') {
            this.cartButton = true;
          } else {
            this.cartButton = false;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  logout() {
    this._authService.logout();
  }
}
