import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDto } from '../models/carDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44350/api/'
  constructor(private httpClient : HttpClient) { }

  getCarsDto() : Observable<ListResponseModel<CarDto>> {
    let url = this.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDto>>(url);
  }

  getCars() : Observable<ListResponseModel<Car>> {
    let url = this.apiUrl + "cars/getall";
    return this.httpClient.get<ListResponseModel<Car>>(url);
  }

  getCarsByColor(colorId:number) : Observable<ListResponseModel<CarDto>> {
    let url = this.apiUrl + "cars/getallbycolor?colorid=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDto>>(url);
  }

  getCarsByBrand(brandId:number) : Observable<ListResponseModel<CarDto>> {
    let url = this.apiUrl + "cars/getallbybrand?brandid=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDto>>(url);
  }

  add(car:Car) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "cars/add", car);
  }

  update(car:Car) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "cars/update", car);
  }
}
