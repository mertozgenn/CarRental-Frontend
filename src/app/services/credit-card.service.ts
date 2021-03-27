import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = 'https://localhost:44350/api/'

  constructor(private httpClient:HttpClient) { }

  getCreditCard() : Observable<SingleResponseModel<CreditCard>>{
    let userId = localStorage.getItem("userId")!
    return this.httpClient.get<SingleResponseModel<CreditCard>>(this.apiUrl + "creditcards/get?userId=" + userId)
  }

  add(creditCard : CreditCard){
    console.log(creditCard)
    this.httpClient.post((this.apiUrl + 'creditcards/add'), creditCard).subscribe(response => {
      console.log(response)
    })
  }
}
