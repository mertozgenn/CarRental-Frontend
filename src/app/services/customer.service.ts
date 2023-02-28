import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.environment.apiUrl
  }

  getCustomers() : Observable<ListResponseModel<Customer>> {
    let url = this.apiUrl + "customers/getAll";
    return this.httpClient.get<ListResponseModel<Customer>>(url);
  }

  get() : Observable<SingleResponseModel<Customer>> {
    let url = this.apiUrl + "customers/getByUserId";
    return this.httpClient.get<SingleResponseModel<Customer>>(url);
  }

  add(customer:Customer) : Observable<ResponseModel> {
    let url = this.apiUrl + "customers/add";
    return this.httpClient.post<ResponseModel>(url, customer);
  }

  update(customer:Customer) : Observable<ResponseModel> {
    let url = this.apiUrl + "customers/update";
    return this.httpClient.post<ResponseModel>(url, customer);
  }
}
