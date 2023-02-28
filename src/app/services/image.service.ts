import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from '../models/image';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  apiUrl: string;
  rootApiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.environment.apiUrl
    this.rootApiUrl = environment.environment.rootApiUrl
  }

  getImageByCar(carId:number) : Observable<ListResponseModel<Image>> {
    let url = this.apiUrl + "carImages/getByCarId?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Image>>(url);
  }

  uploadImage(file: File, carId : string) : Observable<HttpEvent<any>>{
    let url = this.apiUrl + "carImages/add"
    let formData = new FormData();
    formData.append('Image', file);
    formData.append('carId', carId)
    return this.httpClient.post<HttpEvent<any>>(url, formData);
  }

  deleteImage(image : Image){
    let url = this.apiUrl + "carImages/delete"
    return this.httpClient.post(url, image)
  }

  getBaseImageUrl(){
    return this.rootApiUrl + "/pictures/";
  }
}
