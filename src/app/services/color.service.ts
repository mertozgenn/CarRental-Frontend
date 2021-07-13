import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = 'https://localhost:5001/api/colors/';
  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl + "getAll");
  }

  add(color:Color) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", color);
  }

  update(color:Color) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update", color);
  }

  delete(color:Color) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "delete", color);
  }
}
