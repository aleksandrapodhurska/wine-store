import { AppComponent } from './../../../app.component';
import { Observable } from 'rxjs';
import { AuthenticationService } from './../../authentication/services/authentication.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserData } from 'src/app/model/token';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  userData$: Observable<UserData>;

  admin:boolean = true;

  constructor(
    private _authService: AuthenticationService,
    public _app: AppComponent,
  ) {
    this.userData$ = this._authService.userData$;
  }

  ngOnInit(): void {
    this.userData$.subscribe(userData => {
      if (userData) {
        if (userData.user.role !== 'admin') {
          this.admin = false;
        } else {
          this.admin = true;
        }
      }
    });
  }

  ngOnDestroy(): void {
    
  }


  logout(){
    this._authService.logout();
  }

}
