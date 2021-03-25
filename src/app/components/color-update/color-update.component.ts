import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm : FormGroup
  colorId:number
  colorName:string
  constructor(private formBuilder:FormBuilder, private colorService:ColorService, 
              private toastrService:ToastrService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.colorId = parseInt((params["colorId"]));
      this.getColorDetails(parseInt((params["colorId"])))
      this.createColorUpdateForm()
    })
  }

  getColorDetails(colorId:number){
    this.colorService.getColors().subscribe(response => {
      this.colorName = response.data.filter(c => c.colorId == colorId)[0].colorName
    })
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorId : [this.colorId],
      colorName : [this.colorName, Validators.required]
    })
  }

  update(){
      if(this.colorUpdateForm.valid){
        let colorModel = Object.assign({}, this.colorUpdateForm.value)
        console.log(colorModel)
        this.colorService.update(colorModel).subscribe(response => {
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
