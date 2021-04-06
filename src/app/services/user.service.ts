import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44350/api/"
  constructor(private httpClient : HttpClient) { }

  getUser(userId:number) : Observable<ListResponseModel<User>>{
    return this.httpClient.get<ListResponseModel<User>>(this.apiUrl + "users/getbyid?userid=" + userId)
  }

  updateUser(user:User) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "users/update", user)
  }

  changePassword(password:string){
    return this.httpClient.post(this.apiUrl + "users/changepassword", {"password" : password})
  }
}
