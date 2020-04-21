import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'polishRole'
})
export class PolishRolePipe implements PipeTransform {

  transform(role: string, args?: any): string {
    switch (role.toLowerCase()) {
      case 'client':
        return 'Klient';
        break;
      case 'serviceman':
        return 'Serwisant';
        break;
      case 'salesman':
        return 'Ekspedient';
        break;
      default:
        return role;
    }
  }
}
