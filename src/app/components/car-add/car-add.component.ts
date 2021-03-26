import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carAddForm : FormGroup
  constructor(private formBuilder : FormBuilder, private toastrService : ToastrService,
               private carService : CarService, private router:Router) { }

  ngOnInit(): void {
    this.createCarAddForm()
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      description : ["", Validators.required],
      brandId : ["", Validators.required],
      colorId : ["", Validators.required],
      dailyPrice : ["", Validators.required],
      modelYear : ["", Validators.required],
      minFindeks : ["", Validators.required]
    })
  }

  add(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({}, this.carAddForm.value)
      console.log(carModel)
      this.carService.add(carModel).subscribe(response => {
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
