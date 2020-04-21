import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'polishRole'
})
export class PolishRolePipe implements PipeTransform {

  transform(role: string, args?: any): string {
    debugger;
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


  // transform(roles: string[], args?: any): string[] {
  //   const newRoles = [];
  //   for (const role of roles) {
  //     switch (role.toLowerCase()) {
  //       case 'client':
  //         newRoles.push('Klient');
  //         break;
  //       case 'serviceman':
  //         newRoles.push('Serwisant');
  //         break;
  //       case 'salesman':
  //         newRoles.push('Ekspedient');
  //         break;
  //       default:
  //         newRoles.push(role);
  //     }
  //   }
  //   return newRoles;
  // }
}
