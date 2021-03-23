import { Pipe, PipeTransform } from '@angular/core';
import { CarDto } from '../models/carDto';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: CarDto[], filterText:string): CarDto[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : ""
    return filterText ? value.filter(c => c.description.toLocaleLowerCase().includes(filterText)) : value
  }

}
