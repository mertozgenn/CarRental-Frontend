import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands:Brand[]
  dataLoaded = false
  constructor(private brandService:BrandService, private toasterService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands()
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
      this.dataLoaded = true
    })
  }

  delete(brand:Brand){
    this.brandService.delete(brand).subscribe(response => {
      this.toasterService.success("Silindi");
      location.reload()
    }, responseError => {
      this.toasterService.error("Hata Oluştu")
    })
  }
}
