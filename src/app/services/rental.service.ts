import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDto } from '../models/rentalDto';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44350/api/'
  constructor(private httpClient : HttpClient) { }

  getRentals() : Observable<ListResponseModel<RentalDto>> {
    let url = this.apiUrl + "rentals/getrentaldetails";
    return this.httpClient.get<ListResponseModel<RentalDto>>(url);
  }

  addRental(carId:number, rentDate:string) {
    let url = this.apiUrl + "rentals/add"
    this.httpClient.post(url, {carId:carId, customerId:1, rentDate:rentDate})
  }
}
