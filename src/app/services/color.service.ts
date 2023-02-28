import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.environment.apiUrl
  }

  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl + "colors/getAll");
  }

  add(color:Color) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "colors/add", color);
  }

  update(color:Color) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "colors/update", color);
  }

  delete(color:Color) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "colors/delete", color);
  }
}
