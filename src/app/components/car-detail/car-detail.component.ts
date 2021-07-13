import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { Image } from 'src/app/models/image';
import { CarService } from 'src/app/services/car.service';
import { FindeksService } from 'src/app/services/findeks.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car:CarDto
  images:Image[] = []
  isFindeksOk : boolean
  findeks : number
  isLoggedIn = false
  imageFolder = "https://localhost:5001/pictures/"
  constructor(private imageService:ImageService, private activatedRoute:ActivatedRoute
            ,private carService:CarService, private findeksService:FindeksService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCarDetails(params["carId"])
      this.getImages(params["carId"])
      this.getCarFindeks(params["carId"])
    })
  }
  getImages(carId:number){
    this.imageService.getImageByCar(carId).subscribe(response => {
      this.images = response.data
    })
  }
  
  getCarDetails(carId:number) {
    this.carService.getCarDtoById(carId).subscribe(response => {
    this.car = response.data
    })
  }

  getCarFindeks(carId:number) {
    this.carService.getCarFindeks(carId).subscribe(response => {
    this.findeks = response.data
    this.checkFindeks()
    })
  }

  checkFindeks(){
    let userId = localStorage.getItem("userId")
    if(userId != null){
      this.isLoggedIn = true
      this.isFindeksOk = (this.findeksService.getUserFindeks(parseInt(userId)) >= this.findeks)
    } else {
      this.isLoggedIn = false
      this.isFindeksOk = false
    }
  }

}
