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
imageFolder = "https://localhost:5001/pictures/"
brands : Brand[] = []
selectedBrandName : string = "Marka Seçin"
colors : Color[] = []
selectedColorName : string = "Renk Seçin"
dataLoaded = false;
filterText:string

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute,
              private colorService:ColorService, private brandService : BrandService) { }

  ngOnInit(): void {
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
    this.carService.getCarsDto().subscribe(response => {
      if(this.selectedColorName != "Renk Seçin")
      this.cars = response.data.filter(c => c.colorName == this.selectedColorName)
      if(this.selectedBrandName != "Marka Seçin")
      this.cars = response.data.filter(c => c.brandName == this.selectedBrandName)
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.cars = response.data
      this.dataLoaded = true
    })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars = response.data
      this.dataLoaded = true
    })
  }
}
