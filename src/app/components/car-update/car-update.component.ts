import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm : FormGroup
  carId:number
  description:string
  brandId:number
  colorId:number
  dailyPrice:number
  modelYear:string
  minFindeks:number
  constructor(private formBuilder:FormBuilder, private carService:CarService, 
              private toastrService:ToastrService, private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.carId = parseInt((params["carId"]));
      this.getCarDetails(parseInt((params["carId"])))
    })
    this.createCarUpdateForm()
  }

  getCarDetails(carId:number){
    this.carService.getCars().subscribe(response => {
      this.description = response.data.filter(c => c.carId == carId)[0].description
      this.brandId = response.data.filter(c => c.carId == carId)[0].brandId
      this.colorId = response.data.filter(c => c.carId == carId)[0].colorId
      this.dailyPrice = response.data.filter(c => c.carId == carId)[0].dailyPrice
      this.modelYear = response.data.filter(c => c.carId == carId)[0].modelYear
      this.minFindeks = response.data.filter(c => c.carId == carId)[0].minFindeks
    })
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      carId : [this.carId],
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
