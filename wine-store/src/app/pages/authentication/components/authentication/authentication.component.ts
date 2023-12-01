import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/model/token';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  userData$: Observable<UserData>;
  loggedIn: boolean = false;

  public screenWidth: number;
  constructor(
    public _router: Router,
    private _authService: AuthenticationService
    ) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this._authService.userData$.subscribe(success => {
      if (success) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
  }
}
