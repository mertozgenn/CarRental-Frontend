import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl: string;
  private rentModel : Rental
  private totalPrice : number
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.environment.apiUrl
  }

  getRentalsDto() : Observable<ListResponseModel<RentalDto>> {
    let url = this.apiUrl + "rentals/getRentalDetails";
    return this.httpClient.get<ListResponseModel<RentalDto>>(url);
  }

  getRentals() : Observable<ListResponseModel<Rental>> {
    let url = this.apiUrl + "rentals/getAll";
    return this.httpClient.get<ListResponseModel<Rental>>(url);
  }

  addRental(rental:Rental) {
    let url = this.apiUrl + "rentals/add"
    return this.httpClient.post<ResponseModel>(url, rental)
  }

  setRentModel(rentModel : Rental) {
    this.rentModel = rentModel
  }

  getRentModel() {
    return this.rentModel
  }

  setTotalPrice(totalPrice : number) {
    this.totalPrice = totalPrice
  }

  getTotalPrice() {
    return this.totalPrice
  }

  

}
