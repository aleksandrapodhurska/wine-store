import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductItemComponent } from './elements/product-item/product-item.component';
import { CartItemComponent } from './elements/cart-item/cart-item.component';
import { MainComponent } from './main/main.component';
import { CategoriesComponent } from './elements/categories/categories.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ButtonModule } from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {TabMenuModule} from 'primeng/tabmenu';
import {BadgeModule} from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import {ScrollTopModule} from 'primeng/scrolltop';
import {OrderListModule} from 'primeng/orderlist';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ToolbarModule} from 'primeng/toolbar';
import {ContextMenuModule} from 'primeng/contextmenu';
import {FileUploadModule} from 'primeng/fileupload';
import {DialogModule} from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {SliderModule} from 'primeng/slider';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ProductDialogComponent } from './elements/product-dialog/product-dialog.component';


@NgModule({
  declarations: [
    CartComponent,
    ProductsComponent,
    ProductItemComponent,
    CartItemComponent,
    MainComponent,
    CategoriesComponent,
    ProductFormComponent,
    ProductDialogComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    CardModule,
    TableModule,
    ToolbarModule,
    DataViewModule,
    DropdownModule,
    ButtonModule,
    TabMenuModule,
    BadgeModule,
    ChipModule,
    ScrollTopModule,
    OrderListModule,
    ToastModule,
    ContextMenuModule,
    ScrollPanelModule,
    FileUploadModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextareaModule,
    InputTextModule,
    InputNumberModule,
    ProgressBarModule,
    SliderModule,
    RadioButtonModule
  ],
  exports: [
    CartComponent,
    // ProductsComponent,
    // ProductItemComponent,
    // CartItemComponent,
    MainComponent
  ],
  providers: [MessageService, ConfirmationService]
})
export class MainModule { }
