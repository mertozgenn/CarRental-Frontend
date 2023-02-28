import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCard';
import { PaymentModel } from '../models/paymentModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.environment.apiUrl
  }

  getCreditCard() : Observable<SingleResponseModel<CreditCard>>{
    return this.httpClient.get<SingleResponseModel<CreditCard>>(this.apiUrl + "creditcards/get")
  }

  add(creditCard : CreditCard){
    return this.httpClient.post((this.apiUrl + 'creditcards/add'), creditCard)
  }

  pay(creditCard : CreditCard, totalPrice : number){
    let paymentModel : PaymentModel = {creditCard, totalPrice}
    return this.httpClient.post(this.apiUrl + "creditcards/pay", paymentModel)
  }

  delete(creditCard:CreditCard){
    return this.httpClient.post(this.apiUrl + "creditcards/delete", creditCard)
  }
}
