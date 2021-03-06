import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDto } from '../models/carDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:5001/api/'
  constructor(private httpClient : HttpClient) { }

  getCarsDto() : Observable<ListResponseModel<CarDto>> {
    let url = this.apiUrl + "cars/getCarDetails";
    return this.httpClient.get<ListResponseModel<CarDto>>(url);
  }

  getCarDtoById(id:number) : Observable<SingleResponseModel<CarDto>> {
    let url = this.apiUrl + "cars/getCarDetailsById?id=" + id;
    return this.httpClient.get<SingleResponseModel<CarDto>>(url);
  }

  getCarFindeks(id:number) : Observable<SingleResponseModel<number>> {
    let url = this.apiUrl + "cars/getCarFindeks?id=" + id;
    return this.httpClient.get<SingleResponseModel<number>>(url);
  }

  getCars() : Observable<ListResponseModel<Car>> {
    let url = this.apiUrl + "cars/getAll";
    return this.httpClient.get<ListResponseModel<Car>>(url);
  }

  getById(id:number) : Observable<SingleResponseModel<Car>> {
    let url = this.apiUrl + "cars/getById?id=" + id;
    return this.httpClient.get<SingleResponseModel<Car>>(url);
  }

  getCarsByColor(colorId:number) : Observable<ListResponseModel<CarDto>> {
    let url = this.apiUrl + "cars/getAllByColor?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDto>>(url);
  }

  getCarsByBrand(brandId:number) : Observable<ListResponseModel<CarDto>> {
    let url = this.apiUrl + "cars/getAllByBrand?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDto>>(url);
  }

  add(car:Car) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "cars/add", car);
  }

  update(car:Car) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "cars/update", car);
  }

  delete(car : Car){
    let url = this.apiUrl + "cars/delete"
    return this.httpClient.post<ResponseModel>(url,car)
  }
}
