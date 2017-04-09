import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: Object): any {
    Object.keys(query).forEach(key =>
      array = _.filter(array, row => row[key].toLowerCase().indexOf(query[key].toLowerCase()) > -1 )
    );
    return array;
  }
}
