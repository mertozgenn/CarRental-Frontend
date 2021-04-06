import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  rentForm : FormGroup
  carId : number
  days : number
  totalPrice : number
  companyName : string
  customerId : number
  userName : string
  dailyPrice:number
  rentDate: Date
  returnDate : Date
  available : boolean
  constructor(private activatedRoute:ActivatedRoute, private rentalService:RentalService, 
              private formBuilder:FormBuilder, private carService:CarService,
              private customerService:CustomerService, private userService : UserService,
              private router : Router, private toasterService:ToastrService) { }

  ngOnInit(): void {
    this.getCustomerId()
    this.getCarId()
    this.getDailyPrice()
    this.getDays()
    this.getUserName()
    this.getCompanyName()
    this.createRentForm()
  }

  getCompanyName(){
    this.customerService.getCustomers().subscribe(response => {
      this.companyName = response.data.filter(c => c.userId == parseInt(localStorage.getItem("userId")!))[0].companyName
    })
  }

  getCustomerId(){
    this.customerService.getCustomers().subscribe(response => {
      this.customerId = response.data.filter(c => c.userId == parseInt(localStorage.getItem("userId")!))[0].id
      this.createRentForm()
    })
  }

  getUserName(){
    this.userService.getUser(parseInt(localStorage.getItem("userId")!)).subscribe(response => {
      this.userName = response.data[0].firstName + " " + response.data[0].lastName
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

  getDays(){
  var day_start = new Date(this.rentDate);
  var day_end = new Date(this.returnDate);
  return (day_end.getTime() - day_start.getTime()) / (1000 * 60 * 60 * 24);
  }

  getTotalPrice(days:number){
    this.totalPrice = this.dailyPrice * days
  }

  checkIfAvailable(carId:number){
    var rent = new Date(this.rentDate).getTime();
    var returnn = new Date(this.returnDate).getTime();
    var now = Date.now()

    if(returnn < now || rent < now) {
      this.toasterService.info("Tarih bugünden küçük olamaz")
      this.available = false
      return
    }

    if(returnn < rent){
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
        (new Date(r.returnDate).getTime()==returnn ||
        new Date(r.rentDate).getTime()==rent ||
        (rent < new Date(r.rentDate).getTime() &&  
        new Date(r.returnDate).getTime() < returnn))).length > 0)
    })
  }
}

  createRentForm(){
    this.rentForm = this.formBuilder.group({
      carId : [this.carId],
      customerId : [this.customerId],
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
  this.checkIfAvailable(this.carId)
}

}
