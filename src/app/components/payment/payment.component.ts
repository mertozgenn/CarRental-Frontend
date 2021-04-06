import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  rentForm: FormGroup;
  paymentForm: FormGroup;
  savedCard: CreditCard;
  save: boolean = false;
  totalPrice: number;

  constructor(
    private creditCardService: CreditCardService,
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.getSavedCard();
    this.getTotalPrice();
    this.createPaymentForm();
  }

  getSavedCard() {
    this.creditCardService.getCreditCard().subscribe((response) => {
      this.savedCard = response.data;
    });
  }

  getTotalPrice() {
    this.totalPrice = this.rentalService.getTotalPrice();
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      name: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiration: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  saveCreditCard() {
    let cardModel: CreditCard = Object.assign({}, this.paymentForm.value);
    cardModel.userId = parseInt(localStorage.getItem('userId')!);
    this.creditCardService.add(cardModel);
  }

  rent() {
    if (this.paymentForm.valid) {
      let cardModel = Object.assign({}, this.paymentForm.value);
      this.creditCardService
        .pay(cardModel, this.totalPrice)
        .subscribe((response) => {
          let rentModel = this.rentalService.getRentModel()
          this.rentalService.addRental(rentModel).subscribe(
            (response) => {
              this.router.navigate(["/"])
              if (this.save) this.saveCreditCard();
              this.toastrService.success(response.message, 'Başarılı');
            },
            (responseError) => {
              if (responseError.error.Errors.length > 0) {
                for (let i = 0; i < responseError.error.Errors.length; i++) {
                  this.toastrService.error(
                    responseError.error.Errors[i].ErrorMessage,
                    'Doğrulama Hatası'
                  );
                }
              }
            }
          );
        });
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  rentWithSavedCard() {
      this.creditCardService
        .pay(this.savedCard, this.totalPrice)
        .subscribe((response) => {
          let rentModel = this.rentalService.getRentModel()
          this.rentalService.addRental(rentModel).subscribe(
            (response) => {
              this.router.navigate(["/"])
              this.toastrService.success(response.message, 'Başarılı');
            },
            (responseError) => {
              if (responseError.error.Errors.length > 0) {
                for (let i = 0; i < responseError.error.Errors.length; i++) {
                  this.toastrService.error(
                    responseError.error.Errors[i].ErrorMessage,
                    'Doğrulama Hatası'
                  );
                }
              }
            }
          );
        });
  }
}
