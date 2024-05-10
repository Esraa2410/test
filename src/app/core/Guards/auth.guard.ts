import { CanActivateFn ,Router} from '@angular/router';
import {  inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router:Router = inject(Router);

  
  if (localStorage.getItem('userToken')!==null) {
        return true;
      } else {
        _Router.navigate(['/auth']);
        return false;
      }
  
};










