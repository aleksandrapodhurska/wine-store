import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './../main/components/cart/cart.component';
import { MainModule } from './../main/main.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { DeliveryFormComponent } from './components/delivery-form/delivery-form.component';

import { CardModule } from 'primeng/card';
import {SidebarModule} from 'primeng/sidebar';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {TabMenuModule} from 'primeng/tabmenu';
import {BadgeModule} from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import {ScrollTopModule} from 'primeng/scrolltop';
import {OrderListModule} from 'primeng/orderlist';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {PasswordModule} from 'primeng/password';
import {ContextMenuModule} from 'primeng/contextmenu';
import {InputMaskModule} from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import {KeyFilterModule} from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { SubmittedOrderComponent } from './components/submitted-order/submitted-order.component';

@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailsComponent,
    DeliveryFormComponent,
    SubmittedOrderComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MainModule,
    CardModule,
    PasswordModule,
    DropdownModule,
    InputMaskModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    KeyFilterModule
    //CartComponent
  ],
  exports: [
    OrderDetailsComponent
  ]
})
export class OrderModule { }
