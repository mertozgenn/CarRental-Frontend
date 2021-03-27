import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = 'https://localhost:44350/api/'
  constructor(private httpClient : HttpClient) { }

  getCustomers() : Observable<ListResponseModel<Customer>> {
    let url = this.apiUrl + "customers/getall";
    return this.httpClient.get<ListResponseModel<Customer>>(url);
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
