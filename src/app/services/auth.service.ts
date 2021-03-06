import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://localhost:5001/api/"
  constructor(private httpClient : HttpClient) { }

  login(loginModel : LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "auth/login", loginModel)
  }

  register(registerModel : RegisterModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "auth/register", registerModel)
  }

  getUserId(): Observable<number>{
   return this.httpClient.get<number>(this.apiUrl + "auth/getUserId")
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
}
