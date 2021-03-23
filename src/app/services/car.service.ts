import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44350/api/'
  constructor(private httpClient : HttpClient) { }

  getCars() : Observable<ListResponseModel<Car>> {
    let url = this.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(url);
  }

  getCarsByColor(colorId:number) : Observable<ListResponseModel<Car>> {
    let url = this.apiUrl + "cars/getallbycolor?colorid=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(url);
  }

  getCarsByBrand(brandId:number) : Observable<ListResponseModel<Car>> {
    let url = this.apiUrl + "cars/getallbybrand?brandid=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(url);
  }
}
