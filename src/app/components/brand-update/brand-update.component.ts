import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm : UntypedFormGroup
  brandId:number
  brandName:string
  constructor(private formBuilder:UntypedFormBuilder, private brandService:BrandService, 
              private toastrService:ToastrService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.brandId = parseInt((params["brandId"]));
      this.getBrandDetails(parseInt((params["brandId"])))
    })
    this.createBrandUpdateForm()
  }

  getBrandDetails(brandId:number){
    this.brandService.getBrands().subscribe(response => {
      this.brandName = response.data.filter(b => b.brandId == brandId)[0].brandName
    })
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandId : [this.brandId],
      brandName : [this.brandName, Validators.required],
    })
  }

  update(){
      if(this.brandUpdateForm.valid){
        let brandModel = Object.assign({}, this.brandUpdateForm.value)
        this.brandService.update(brandModel).subscribe(response => {
          this.toastrService.success(response.message, "Başarılı")
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
