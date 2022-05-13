import { CartService } from './../../services/cart.service';
import { State } from './../../common/state';
import { Country } from './../../common/country';
import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopFormService } from 'src/app/services/shop-form.service';
import { CustomValidators } from 'src/app/common/custom-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {


  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonth: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];


  constructor(private formBuilder: FormBuilder,
    private shopFormService: ShopFormService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.reviewCardDetails();


    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required,
        Validators.minLength(2),
        CustomValidators.notOnlyWhitespace]),

        lastName: new FormControl('', [Validators.required,
        Validators.minLength(2),
        CustomValidators.notOnlyWhitespace]),

        email: new FormControl('', [Validators.required,
        Validators.pattern('a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
        CustomValidators.notOnlyWhitespace]),
      }),

      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required,
        Validators.minLength(2),
        CustomValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required,
        Validators.minLength(2),
        CustomValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required,
        Validators.minLength(5),
        CustomValidators.notOnlyWhitespace]),
      }),

      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required,
        Validators.minLength(2),
        CustomValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required,
        Validators.minLength(2),
        CustomValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required,
        Validators.minLength(5),
        CustomValidators.notOnlyWhitespace]),
      }),

      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required,
        Validators.minLength(2),
        CustomValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']

      }),


    });

    //populate credit card month

    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth" + startMonth);

    this.shopFormService.getCreditCardMonth(startMonth).subscribe(data => {
      console.log("Retrived credit card month:" + JSON.stringify(data));
      this.creditCardMonth = data;
    });



    //populate credit card years
    this.shopFormService.getCreditCardYears().subscribe(data => {
      console.log("Retrived credit card years:" + JSON.stringify(data));
      this.creditCardYears = data;
    });

    //populate countries
    this.shopFormService.getCountries().subscribe(data => {
      console.log("Retrived countries" + JSON.stringify(data));
      this.countries = data;
    });
  }
    reviewCardDetails() {
    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    });
    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data;
    });



  }


  onSubmit() {
    console.log("handling the submit btn");
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log(this.checkoutFormGroup.get('customer')?.value.email);

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
  }
  //customer
  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  //Shipping Address getter for  Control Validation
  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }
  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }


  //Billing Address getter for  Control Validation

  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }
  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }

  //credit card getter for control validation
  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }


  copyShippingAddressToBillingAddress(event: any) {

    if (event.target.checked) {

      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);
    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.shopFormService.getCreditCardMonth(startMonth).subscribe(data => {
      console.log("Retrived credit card month:" + JSON.stringify(data));
      this.creditCardMonth = data;
    });
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);
    this.shopFormService.getStates(countryCode).subscribe(data => {

      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      }
      else {
        this.billingAddressStates = data;
      }

      // select first item by default
      formGroup?.get('state')?.setValue(data[0]);
    });

  }

}
