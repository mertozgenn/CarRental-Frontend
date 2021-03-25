import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  rentForm : FormGroup
  paymentForm : FormGroup
  carId : number
  dailyPrice:number
  rentDate:string
  available = false
  constructor(private activatedRoute:ActivatedRoute, private rentalService:RentalService, 
              private formBuilder:FormBuilder, private toastrService:ToastrService, private carService:CarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.checkIfAvailable(params["carId"]);
    })
    this.getCarId()
    this.getDailyPrice()
    this.getDate()
    this.createRentForm()
    this.createPaymentForm()
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
      cardNumber : ["", Validators.required],
      expirationDate : ["", Validators.required],
      cvv : ["", Validators.required]
    })
  }

  add(){
    if(this.rentForm.valid && this.paymentForm.valid){
      let rentModel = Object.assign({}, this.rentForm.value)
      console.log(rentModel)
      this.rentalService.addRental(rentModel).subscribe(response => {
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
}
