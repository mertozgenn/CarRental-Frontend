import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = 'https://localhost:5001/api/'
  constructor(private httpClient : HttpClient) { }

  getCustomers() : Observable<ListResponseModel<Customer>> {
    let url = this.apiUrl + "customers/getAll";
    return this.httpClient.get<ListResponseModel<Customer>>(url);
  }

  getByUserId(userId:number) : Observable<SingleResponseModel<Customer>> {
    let url = this.apiUrl + "customers/getByUserId?userId=" + userId;
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
