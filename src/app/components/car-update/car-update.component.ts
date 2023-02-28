import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Image } from 'src/app/models/image';
import { CarService } from 'src/app/services/car.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm : UntypedFormGroup
  imageForm : UntypedFormGroup
  imageToUpload : FileList
  imageFolder = "https://localhost:5001/pictures/"
  images:Image[] = []
  carToUpdate : Car = {carId : 0, brandId : 0, colorId : 0, modelYear:"", dailyPrice:0, description:"", minFindeks:0}
  constructor(private formBuilder:UntypedFormBuilder, private carService:CarService, 
              private toastrService:ToastrService, private activatedRoute:ActivatedRoute,
              private router:Router, private imageService : ImageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.carToUpdate.carId = parseInt((params["carId"]))
      this.getCarDetails(parseInt((params["carId"])))
      this.getImages(params["carId"])
      this.createCarUpdateForm()
    })
    
  }

  getCarDetails(carId:number){
    this.carService.getById(carId).subscribe(response => {
      this.carToUpdate = response.data
    })
  }

  getImages(carId:number){
    this.imageService.getImageByCar(carId).subscribe(response => {
      this.images = response.data
    })
  }

  selectFile(event : any) {
    this.imageToUpload = event.target.files
  }

  uploadFile() {
     if (this.imageToUpload == undefined || this.imageToUpload.length == 0) {
      return
    }
    let file: File = this.imageToUpload[0]

    this.imageService.uploadImage(file, this.carToUpdate.carId.toString())
      .subscribe(
        event => {
        },
        (err) => {
          this.toastrService.error("Yükleme Hatası")
        }, () => {
          this.toastrService.success("Resim Yüklendi")
        }
      )
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      carId : [this.carToUpdate.carId],
      description : [""],
      brandId : [""],
      colorId : [""],
      dailyPrice : [""],
      modelYear : [""],
      minFindeks : [""]
    })
  }

  update(){
      this.uploadFile();
      if(this.carUpdateForm.valid){
        let carModel : Car = Object.assign({}, this.carUpdateForm.value)
        if(carModel.description == "") carModel.description = this.carToUpdate.description
        if(carModel.brandId == 0) carModel.brandId = this.carToUpdate.brandId
        if(carModel.colorId == 0) carModel.colorId = this.carToUpdate.colorId
        if(carModel.dailyPrice == 0) carModel.dailyPrice = this.carToUpdate.dailyPrice
        if(carModel.modelYear == "") carModel.modelYear = this.carToUpdate.modelYear
        if(carModel.minFindeks == 0) carModel.minFindeks = this.carToUpdate.minFindeks
        this.carService.update(carModel).subscribe(response => {
          this.toastrService.success(response.message, "Başarılı")
          this.router.navigate(["/"])
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

  deleteImage(imageToDelete : Image){
    this.imageService.deleteImage(imageToDelete).subscribe(response => {
      this.toastrService.success("Silindi")
      for (let index = 0; index < this.images.length; index++) {
        const image = this.images[index];
        if(image.imagePath == imageToDelete.imagePath){
          this.images.splice(index,1)
        }
      }
    })
  }

  deleteCar(){
    this.carService.delete(this.carToUpdate).subscribe(response => {
      this.toastrService.success("Silindi")
      this.router.navigate(["/"])
    })
  }

  isDefault(image : Image){
    return !image.imagePath.includes("default")
  }

}
