import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userText'
})
export class UserTextPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    const arr = value.split(' ');
    return arr[0].charAt(0).toUpperCase() + arr[1].charAt(0).toUpperCase();
  }

}
