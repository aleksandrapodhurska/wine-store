import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItemGroup } from 'primeng/api';
import { CartService } from 'src/app/pages/main/services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.scss']
})
export class DeliveryFormComponent implements OnInit {
  public screenWidth: number;
  form: FormGroup;
  title: 'Registration';

  cart:any;
  groupedCities: SelectItemGroup[];
  cities: any;
  deliverySlots: any;
  dateOptions: SelectItemGroup[] = [];

  creditCard_validation_message = {
    'creditCard': [
      { type: 'pattern', message: 'Credit card can contain only numbers' },
      { type: 'required', message: 'Credit card is required' },
      { type: 'minlength', message: 'Credit card must be at least 16 characters long' },
      { type: 'maxlength', message: 'Credit card value cannot be more than 16 characters long' },
    ]
  }

  constructor(
    private _router: Router,
    private _orderService: OrderService,
    private formBuilder: FormBuilder,
    private _cartService: CartService
    )
    { 
    this.form = this.formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      date: ['', Validators.required],
      creditCard: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^([0-9]{4}[\s-]?){3}([0-9]{4})$'),
        
        Validators.minLength(16),
        Validators.maxLength(16),
      ])],
    })
  }


  ngOnInit(): void {
    this.getCities();
   
    this._cartService.cart$.subscribe(cart => {
      this.cart = cart;
    })
    this._orderService.deliverySlots$.pipe().subscribe(data => {
      if (data) {
        this.deliverySlots = data;
        this.getDateSlots();
      }
    })
  }

  getCities(){
    this.groupedCities = [
      {
          label: 'Center', value: 'gd',
          items: [
              {label: 'Tel Aviv', value: 'Tel Aviv'},
              {label: 'Ramat Gan', value: 'Ramat Gan'},
              {label: 'Petah Tikva', value: 'Petah Tikva'},
          ]
      },
      {
          label: 'South', value: 'sh',
          items: [
              {label: 'Beer Sheva', value: 'Beer Sheva'},
              {label: 'Dimona', value: 'Dimona'},
          ]
      }
    ]
  }

  getDateSlots(){
    const dateOptions: any[] = [];
    this.deliverySlots.map((item: any) => {

      if (!dateOptions.find(elem => elem.value === item.date)) {
        dateOptions.push({
          label: item.date.split('T')[0].split('-').reverse().join('-'), value: item.date, 
          items: [
            {label: `${item.time.startTime.split('T')[1].slice(0,5)} - ${item.time.endTime.split('T')[1].slice(0,5)}`, value: item._id, inactive: item.owner ? true : false}
          ]
        })
      } else {
        let index = dateOptions.findIndex(elem => elem.value === item.date);
        dateOptions[index].items.push(
          {label: `${item.time.startTime.split('T')[1].slice(0,5)} - ${item.time.endTime.split('T')[1].slice(0,5)}`, value: item._id, inactive: item.owner ? true : false}
          )
        }
        this.dateOptions = dateOptions;
    })
  }

  createOrder() {
    const form = this.form.getRawValue();
    const payload = {
      cart: this.cart._id,
      subtotal: this.cart.subtotal,
      owner: this.cart.owner,
      payment: form.creditCard,
      delivery: {
        address: {
          city: form.city,
          street: form.street,
        },
        date: form.date,
      },
    }
    this._orderService.createOrder(payload);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
  }

  backToShop() {
    this._router.navigateByUrl('/shop');
  }

}
