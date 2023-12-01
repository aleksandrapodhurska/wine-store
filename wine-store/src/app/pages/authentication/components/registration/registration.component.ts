import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SelectItem, User } from 'src/app/model/user';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItemGroup } from 'primeng/api';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  @Input() screenWidth: number;
 
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  
  form: FormGroup;
  permitted: boolean = false;
  matching_passwords_group:any;

  groupedCities: SelectItemGroup[];
  error: any;

  account_validation_messages = {
    'idCard': [
      { type: 'pattern', message: 'Id card can contain only numbers' },
      { type: 'required', message: 'Id card number is required' },
      { type: 'minlength', message: 'Id card must be at least 9 characters long' },
      { type: 'maxlength', message: 'Id card value cannot be more than 9 characters long' },
    ],
    'username': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    }    

  constructor(
    private _router: Router,
    private _authService: AuthenticationService,
    private formBuilder: FormBuilder
    ) { 
    this.form = this.formBuilder.group({
      idCard: new FormControl('',  Validators.compose([
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.minLength(9),
        Validators.maxLength(9),
      ])),
      firstName: ['', []],
      familyName: ['', []],
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.formBuilder.group({
        password: ['', Validators.required],
        confirm_password: ['', Validators.required]
      }, {validator: this.areEqual}),
      address: this.formBuilder.group({
        city: ['', Validators.required],
        street: ['', Validators.required]
      })
    })

    this._authService.errorStatus$.pipe(takeUntil(this.destroyed$)).subscribe((error) => {
      if (error) {
        this.error = error;
      }
    });
  }

  areEqual(group: FormGroup) {
    let value;
    let valid = true;
    
    for (let key in group.controls) {
      if (group.controls.hasOwnProperty(key)) {
        let control: FormControl = <FormControl>group.controls[key];

        if (value === undefined) {
          value = control.value
        } else {
          if (value !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }
    if (valid) {
      return null;
    }
    return {
      areEqual: true
    };
  }

  ngOnInit(): void {
    this.getCities();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


  getCities(){
    this.groupedCities = [
      {
          label: 'Center', value: 'gd',
          items: [
              {label: 'Tel Aviv', value: 'Tel Aviv'},
              {label: 'Ramat Gan', value: 'Ramat Gan'},
              {label: 'Bat Yam', value: 'Bat Yam'},
              {label: 'Petah Tikva', value: 'Petah Tikva'},
              {label: 'Rishon LeZion', value: 'Rishon LeZion'},
          ]
      },
      {
          label: 'North', value: 'nth',
          items: [
              {label: 'Haifa', value: 'Haifa'},
              {label: 'Nof Ha Galil', value: 'Nof Ha Galil'},
              {label: 'Acco', value: 'Acco'},
              {label: 'Afula', value: 'Afula'},
          ]
      },
      {
          label: 'South', value: 'sh',
          items: [
              {label: 'Beer Sheva', value: 'Beer Sheva'},
              {label: 'Dimona', value: 'Dimona'},
              {label: 'Ashdod', value: 'Ashdod'},
              {label: 'Ashkelon', value: 'Ashkelon'},
          ]
      },
      {
          label: 'Jerushalem', value: 'js',
          items: [
              {label: 'Jerusalem', value: 'Jerusalem'},
          ]
      },
      {
          label: 'Yehuda and Shomron', value: 'ye',
          items: [
              {label: 'Ariel', value: 'Ariel'},
              {label: 'Hebron', value: 'Hebron'},
              {label: 'Gush Etzion', value: 'Gush Etzion'},
          ]
      }
    ]
  }

  checkFirstPart() {
      if (this.form.get('username').valid && this.form.get('matching_passwords').valid && this.form.get('idCard').valid) {
      this.permitted = true;
    }
  }
  
  onSubmitUserDetails(){
    const requestObject = this.form.getRawValue();
    requestObject.password = requestObject.matching_passwords.password;
    
    if (this.permitted) {
      this._authService.registration(requestObject);
    }
  }
}
