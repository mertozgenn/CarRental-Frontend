import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors:Color[]
  dataLoaded = false

  constructor(private colorService:ColorService, private toasterService:ToastrService) { }

  ngOnInit(): void {
    this.getColors()
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
      this.dataLoaded = true
    })
  }

  delete(color:Color){
    this.colorService.delete(color).subscribe(response => {
      this.toasterService.success("Silindi");
      location.reload()
    }, responseError => {
      this.toasterService.error("Hata Oluştu")
    })
  }

}
