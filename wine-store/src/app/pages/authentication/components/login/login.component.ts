import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @Input() screenWidth: number;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  account_validation_messages = {
    username: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' },
    ],
  };

  form: FormGroup;
  error: any;

  constructor(
    public _router: Router,
    private _authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      username: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: [null, []],
    });
    this._authService.errorStatus$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((error) => {
      if (error) {
        this.error = error;
      }
    });
  }

  ngOnInit(): void {
    // redirect to shop if already logged in
    if (this._authService.loggedUser) {
      this._router.navigateByUrl('/auth');
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  login() {
    const login = this.form.getRawValue();
    this._authService.login(login);
  }
}
