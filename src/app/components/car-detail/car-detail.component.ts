import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { Image } from 'src/app/models/image';
import { CarService } from 'src/app/services/car.service';
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
  constructor(private imageService:ImageService, private activatedRoute:ActivatedRoute, private sanitizer: DomSanitizer
            ,private carService:CarService, private rentalService:RentalService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCarDetails(params["carId"]);
      this.getImages(params["carId"]);
      this.checkIfAvailable(params["carId"]);
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

  

  checkIfAvailable(carId:number){
    this.rentalService.getRentals().subscribe(response => {
      this.available = !(response.data.filter(r => r.carId==carId && r.returnDate==null).length > 0)
    })
  }
}
