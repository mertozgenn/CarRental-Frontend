import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { Image } from 'src/app/models/image';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { FindeksService } from 'src/app/services/findeks.service';
import { ImageService } from 'src/app/services/image.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  cars:CarDto[] = []
  images:Image[] = []
  available = false
  isFindeksOk : boolean
  findeks : number
  isLoggedIn = false
  constructor(private imageService:ImageService, private activatedRoute:ActivatedRoute
            ,private carService:CarService, private rentalService:RentalService,
            private findeksService:FindeksService, private authService : AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCarDetails(params["carId"]);
      this.getImages(params["carId"]);
      this.checkIfAvailable(params["carId"]);
      this.getFindeks(params["carId"])
    })
  }
  getImages(carId:number){
    this.imageService.getImageByCar(carId).subscribe(response => {
      let images = response.data
      images.forEach(image => {
        image.imagePath = this.getNewUrl(image.imagePath)
      })
      this.images = images
    })
  }

  getNewUrl(url : string) {
    let fileName = url.substring((url.lastIndexOf("\\")))
    return "http://127.0.0.1:8887/" + fileName
  }
  
  getCarDetails(carId:number) {
    this.carService.getCarsDto().subscribe(response => {
    this.cars = response.data.filter((c : CarDto) => c.carId == carId)
    })
  }

  getFindeks(carId:number) {
    this.carService.getCars().subscribe(response => {
    this.findeks = response.data.filter((c : Car) => c.carId == carId)[0].minFindeks
    this.checkFindeks()
    })
  }

  checkFindeks(){
    let userId = localStorage.getItem("userId")
    if(userId != null){
      this.isLoggedIn = true
      this.isFindeksOk = (this.findeksService.getFindeks(parseInt(userId)) >= this.findeks)
      console.log(this.isFindeksOk)
      console.log(this.findeks)
      console.log(this.findeksService.getFindeks(parseInt(userId)))
    } else {
      this.isLoggedIn = false
      this.isFindeksOk = false
    }
  }

  checkIfAvailable(carId:number){
    this.rentalService.getRentals().subscribe(response => {
      this.available = !(response.data.filter(r => r.carId==carId && r.returnDate==null).length > 0)
    })
  }
}
