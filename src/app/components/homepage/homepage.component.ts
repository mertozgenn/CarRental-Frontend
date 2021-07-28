import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/models/image';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  imageFolder = "https://localhost:5001/pictures/"
  images: Image[] = []
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.getImages(1)
  }

  getImages(carId: number) {
    this.imageService.getImageByCar(carId).subscribe(response => {
      this.images = response.data
    })
  }
}
