import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { CarDto } from '../models/carDto';
import { CarFilterModel } from '../models/carFilterModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.environment.apiUrl
  }

  getCarsDto() : Observable<ListResponseModel<CarDto>> {
    let url = this.apiUrl + "cars/getall";
    return this.httpClient.get<ListResponseModel<CarDto>>(url);
  }

  getCarDtoById(id:number) : Observable<SingleResponseModel<CarDto>> {
    let url = this.apiUrl + "cars/getById?id=" + id;
    return this.httpClient.get<SingleResponseModel<CarDto>>(url);
  }

  getCarsByFilter(filter: CarFilterModel) : Observable<ListResponseModel<CarDto>> {
    return this.httpClient.post<ListResponseModel<CarDto>>(this.apiUrl + "cars/getByFilter", filter);
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
