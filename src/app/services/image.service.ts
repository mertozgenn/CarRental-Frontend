import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../models/image';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  apiUrl = 'https://localhost:44350/api/'
  constructor(private httpClient : HttpClient) { }

  getImageByCar(carId:number) : Observable<ListResponseModel<Image>> {
    let url = this.apiUrl + "carimages/getbycarid?carid=" + carId;
    return this.httpClient.get<ListResponseModel<Image>>(url);
  }
}
