import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.environment.apiUrl
  }

  getUser() : Observable<SingleResponseModel<User>>{
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl + "users/get")
  }

  updateUser(user:User) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "users/update", user)
  }

  changePassword(password:string){
    return this.httpClient.post(this.apiUrl + "users/changePassword", {"password" : password})
  }
}
