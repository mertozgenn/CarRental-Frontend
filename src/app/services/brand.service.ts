import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = 'https://localhost:5001/api/brands/'
  constructor(private httpClient : HttpClient) { }

  getBrands() : Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl + "getAll");
  }

  add(brand : Brand) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", brand)
  }

  update(brand : Brand) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update", brand)
  }

  delete(brand : Brand) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "delete", brand)
  }
}
