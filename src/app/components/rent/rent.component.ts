import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  car:Car
  customer:Customer
  rentForm : FormGroup
  days : number
  totalPrice : number
  userName : string
  rentDate: Date
  returnDate : Date
  available : boolean
  constructor(private activatedRoute:ActivatedRoute, private rentalService:RentalService, 
              private formBuilder:FormBuilder, private carService:CarService,
              private customerService:CustomerService, private userService : UserService,
              private router : Router, private toasterService:ToastrService) { }

  ngOnInit(): void {
    this.getCar()
    this.getCustomer()
    this.getDays()
    this.getUserName()
  }

  getCustomer(){
    this.customerService.get().subscribe(response => {
      this.customer = response.data
    })
  }


  getUserName(){
    this.userService.getUser().subscribe(response => {
      this.userName = response.data.firstName + " " + response.data.lastName
    })
  }


  getCar(){
    this.activatedRoute.params.subscribe(params => {
      this.carService.getById(parseInt(params["carId"])).subscribe(response => {
        this.car = response.data
        this.createRentForm()
      })
    })
  }

  getDays(){
  var day_start = new Date(this.rentDate);
  var day_end = new Date(this.returnDate);
  return (day_end.getTime() - day_start.getTime()) / (1000 * 60 * 60 * 24);
  }

  getTotalPrice(days:number){
    this.totalPrice = this.car.dailyPrice * days
  }

  checkIfAvailable(carId:number){
    var startDay = new Date(this.rentDate).getTime();
    var endDay = new Date(this.returnDate).getTime();
    var now = Date.now()

    if(endDay < now || startDay < now) {
      this.toasterService.info("Tarih bugünden küçük olamaz")
      this.available = false
      return
    }

    if(endDay < startDay){
      this.available = false
      return
    }

    if(this.returnDate == null || this.rentDate == null){
      this.available = false
      return
    }
    
    if(this.returnDate != null && this.rentDate != null){
    this.rentalService.getRentals().subscribe(response => {
      this.available = !(response.data.filter(r => 
        r.carId==carId && 
        (new Date(r.returnDate).getTime()==endDay ||
        new Date(r.rentDate).getTime()==startDay ||
        (startDay < new Date(r.rentDate).getTime() &&  
        new Date(r.returnDate).getTime() < endDay))).length > 0)
    })
  }
}

  createRentForm(){
    this.rentForm = this.formBuilder.group({
      carId : [this.car?.carId],
      customerId : [this.customer?.id],
      rentDate : [this.rentDate],
      returnDate : [this.returnDate]
    })
  }

  goPayment(){
     let rentModel = Object.assign({}, this.rentForm.value)
     rentModel.rentDate = this.rentDate
     rentModel.returnDate = this.returnDate
      if(this.rentForm.valid){
      this.rentalService.setRentModel(rentModel)
      this.rentalService.setTotalPrice(this.totalPrice)
      this.router.navigate(["pay"])
    } else {
      this.toasterService.error("Hata Oluştu")
    }
  }


calculate(){
  this.getTotalPrice(this.getDays())
  this.checkIfAvailable(this.car.carId)
}

}
