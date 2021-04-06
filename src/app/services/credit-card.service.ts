import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { PaymentModel } from '../models/paymentModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = 'https://localhost:44350/api/'

  constructor(private httpClient:HttpClient, private toasterService:ToastrService) { }

  getCreditCard() : Observable<SingleResponseModel<CreditCard>>{
    let userId = localStorage.getItem("userId")!
    return this.httpClient.get<SingleResponseModel<CreditCard>>(this.apiUrl + "creditcards/get?userId=" + userId)
  }

  add(creditCard : CreditCard){
    this.httpClient.post((this.apiUrl + 'creditcards/add'), creditCard).subscribe(response => {
      this.toasterService.success("Kredi Kartı Kaydedildi")
    })
  }

  pay(creditCard : CreditCard, totalPrice : number){
    let paymentModel : PaymentModel = {creditCard, totalPrice}
    return this.httpClient.post(this.apiUrl + "creditcards/pay", paymentModel)
  }

  delete(creditCard:CreditCard){
    return this.httpClient.post(this.apiUrl + "creditcards/delete", creditCard)
  }
}
