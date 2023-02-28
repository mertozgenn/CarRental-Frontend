import { ImageService } from 'src/app/services/image.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDto } from 'src/app/models/carDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
cars: CarDto[] = [];
rootImagePath: string
brands : Brand[] = []
selectedBrandId: number = 0
colors : Color[] = []
selectedColorId: number = 0
dataLoaded = false;
filterText:string

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute,
              private colorService:ColorService, private brandService : BrandService, 
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.rootImagePath = this.imageService.getBaseImageUrl()
    this.activatedRoute.params.subscribe(params => {
      if(params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }
      else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else{
        this.getCars();
      }
    })
    this.getColors()
    this.getBrands()
  }

  getCars() {
    this.carService.getCarsDto().subscribe(response => {
      this.cars = response.data
      this.dataLoaded = true
    }) 
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  applyFilter(){
    this.carService.getCarsByFilter({brandId: this.selectedBrandId, colorId: this.selectedColorId}).subscribe(response => {
      this.cars = response.data
      this.dataLoaded = true
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByFilter({colorId: colorId, brandId: null}).subscribe(response => {
      this.cars = response.data
      this.dataLoaded = true
    })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByFilter({brandId: brandId, colorId: null}).subscribe(response => {
      this.cars = response.data
      this.dataLoaded = true
    })
  }
}
