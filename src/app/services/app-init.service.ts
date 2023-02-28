import { Injectable } from '@angular/core';;
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
declare var window: any;

@Injectable()
export class AppInitService {
  public readConfigFile() {
    return from(
        fetch('config.json').then(function(response) {
          return response.json();
        })
      ).pipe(
        map((config) => {
        window.config = config;
        return 
      }));
  }
}