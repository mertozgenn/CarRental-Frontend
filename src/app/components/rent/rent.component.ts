import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  rentForm : FormGroup
  paymentForm : FormGroup
  savedCard : CreditCard
  carId : number
  save : boolean = false
  companyName : string
  userName : string
  dailyPrice:number
  rentDate:string
  available = false
  constructor(private activatedRoute:ActivatedRoute, private rentalService:RentalService, 
              private formBuilder:FormBuilder, private toastrService:ToastrService, private carService:CarService,
              private customerService:CustomerService, private userService : UserService, private creditCardService:CreditCardService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.checkIfAvailable(params["carId"]);
    })
    this.getCarId()
    this.getDailyPrice()
    this.getDate()
    this.getSavedCard()
    this.getUserName()
    this.getCompanyName()
    this.createRentForm()
    this.createPaymentForm()
  }

  getCompanyName(){
    this.customerService.getCustomers().subscribe(response => {
      this.companyName = response.data.filter(c => c.userId == parseInt(localStorage.getItem("userId")!))[0].companyName
    })
  }

  getUserName(){
    this.userService.getUser(parseInt(localStorage.getItem("userId")!)).subscribe(response => {
      this.userName = response.data[0].firstName + " " + response.data[0].lastName
    })
  }

  getSavedCard(){
    this.creditCardService.getCreditCard().subscribe(response => {
      this.savedCard = response.data
      console.log(this.savedCard)
    })
  }

  getCarId(){
    this.activatedRoute.params.subscribe(params => {
      this.carId = parseInt(params["carId"])
    })
  }

  getDailyPrice(){
    this.carService.getCarsDto().subscribe(response => {
      this.dailyPrice = response.data.filter(c => c.carId == this.carId)[0].dailyPrice
    })
  }

  getDate(){
    let date: Date = new Date();
    this.rentDate = date.getDate().toString() + "." + (date.getMonth() + 1).toString() + "." + date.getFullYear()
  }

  checkIfAvailable(carId:number){
    this.rentalService.getRentals().subscribe(response => {
      this.available = !(response.data.filter(r => r.carId==carId && r.returnDate==null).length > 0)
    })
  }

  createRentForm(){
    this.rentForm = this.formBuilder.group({
      carId : [this.carId, Validators.required],
      customerId : ["", Validators.required],
      rentDate : [this.rentDate, Validators.required]
    })
  }

  createPaymentForm(){
    this.paymentForm = this.formBuilder.group({
      name : ["", Validators.required],
      cardNumber : ["", Validators.required],
      expiration : ["", Validators.required],
      cvv : ["", Validators.required]
    })
  }

  rent(){
      if(this.rentForm.valid && this.paymentForm.valid){
      let rentModel = Object.assign({}, this.rentForm.value)
      console.log(rentModel)
      this.rentalService.addRental(rentModel).subscribe(response => {
        if(this.save) this.saveCreditCard()
        this.toastrService.success(response.message, "Başarılı")
      }, responseError => {
        if(responseError.error.Errors.length > 0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası");
          }
        }
      })
    }else{
      this.toastrService.error("Formunuz eksik", "Dikkat");
    }
  }

  saveCreditCard(){
    let cardModel:CreditCard = Object.assign({}, this.paymentForm.value)
    cardModel.userId = parseInt(localStorage.getItem("userId")!)
    console.log(cardModel)
    this.creditCardService.add(cardModel)
  }
}
