
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { FeedComponent } from './components/feed/feed.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import {PasswordModule} from 'primeng/password';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { WelcomeComponent } from './components/welcome/welcome.component';
import {StepsModule} from 'primeng/steps';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    StatisticsComponent,
    FeedComponent,
    AuthenticationComponent,
    WelcomeComponent,
    
  ],
  imports: [
    FormsModule,
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TabViewModule,
    PasswordModule,
    DropdownModule,
    CardModule,
    VirtualScrollerModule,
    StepsModule
  ],
  exports: [
    LoginComponent,
    RegistrationComponent,
    StatisticsComponent,
    FeedComponent,
    AuthenticationComponent
  ]
})
export class AuthenticationModule { }
