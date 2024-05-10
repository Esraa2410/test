import { CanActivateFn ,Router} from '@angular/router';
import {  inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';



export const adminGuard: CanActivateFn = (route, state) => {
  const _Router:Router = inject(Router);
  const _AuthService:AuthService = inject(AuthService);
  const role=_AuthService.role;
  if (localStorage.getItem('userToken')!==null && role == 'SuperAdmin') {
        return true;
      } else {
        _Router.navigate(['/auth']);
        return false;
      }
  
};