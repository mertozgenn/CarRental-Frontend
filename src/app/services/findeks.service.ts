import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FindeksService {

  constructor() { }

  getFindeks(userId:number) : number {
    return parseInt((Math.random() * 1900).toString())
  }
}
