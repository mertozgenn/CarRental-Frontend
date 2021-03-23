import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Image } from 'src/app/models/image';
import { CarService } from 'src/app/services/car.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  cars:Car[] = []
  images:Image[] = []
  constructor(private imageService:ImageService, private activatedRoute:ActivatedRoute, private sanitizer: DomSanitizer
            ,private carService:CarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCarDetails(params["carId"]);
      this.getImages(params["carId"]);
    })
  }
  getImages(carId:number){
    this.imageService.getImageByCar(carId).subscribe(response => {
      this.images = response.data
    })
  }
  
  getCarDetails(carId:number) {
    this.carService.getCars().subscribe(response => {
    this.cars = response.data.filter((c : Car) => c.carId == carId)
    })
  }

  public getSantizeUrl(url : string) {
    //return this.sanitizer.bypassSecurityTrustUrl(url)
      let fileName = url.substring((url.lastIndexOf("\\")))
      return "http://127.0.0.1:8887/" + fileName
  }
}
