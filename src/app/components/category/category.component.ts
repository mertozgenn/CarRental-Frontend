import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  colors: Color[] = [];
  currentColor : Color;
  brands: Brand[] = [];
  currentBrand : Brand
  constructor(private colorService:ColorService, private brandService:BrandService) { }

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
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

  setCurrentColor(color:Color){
    this.currentColor = color;
  }

  getCurrentColorClass(color:Color){
    if(color==this.currentColor){
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand:Brand){
    if(brand==this.currentBrand){
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }
}
