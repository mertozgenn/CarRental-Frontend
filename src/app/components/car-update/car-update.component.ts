import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm : FormGroup
  carToUpdate : Car = {carId : 0, brandId : 0, colorId : 0, modelYear:"", dailyPrice:0, description:"", minFindeks:0}
  constructor(private formBuilder:FormBuilder, private carService:CarService, 
              private toastrService:ToastrService, private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(parseInt((params["carId"])))
      this.carToUpdate.carId = parseInt((params["carId"]))
      console.log(this.carToUpdate)
      this.getCarDetails(parseInt((params["carId"])))
      console.log(this.carToUpdate)
      this.createCarUpdateForm()
    })
    
  }

  getCarDetails(carId:number){
    this.carService.getCars().subscribe(response => {
      this.carToUpdate = response.data.filter(c => c.carId == carId)[0]
    })
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      carId : [this.carToUpdate.carId],
      description : ["", Validators.required],
      brandId : ["", Validators.required],
      colorId : ["", Validators.required],
      dailyPrice : ["", Validators.required],
      modelYear : ["", Validators.required],
      minFindeks : ["", Validators.required]
    })
  }

  update(){
      if(this.carUpdateForm.valid){
        let carModel = Object.assign({}, this.carUpdateForm.value)
        console.log(carModel)
        this.carService.update(carModel).subscribe(response => {
          this.toastrService.success(response.message, "Başarılı")
          this.router.navigate([""])
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
