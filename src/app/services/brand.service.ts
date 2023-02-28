import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.environment.apiUrl
  }

  getBrands() : Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl + "brands/getAll");
  }

  add(brand : Brand) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "brands/add", brand)
  }

  update(brand : Brand) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "brands/update", brand)
  }

  delete(brand : Brand) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "brands/delete", brand)
  }
}
