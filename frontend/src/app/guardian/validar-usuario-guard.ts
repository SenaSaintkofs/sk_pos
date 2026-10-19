import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const validarUsuarioGuard: CanActivateFn = (route, state) => {

  const router = inject(Router); // inject replaza construcotr en funciones
  const idUser = sessionStorage.getItem('id'); // Capturar ID
  
  if (idUser === null || idUser === '') {
    router.navigate(['login']);
    return false;
  }
  /* Version anterior 
  constructor(private router: Router) {

    CanActivateFn(): Boolean {
      const (idUser === null || idUser '') {
        this.router.navigate(['login'])
        retur false
      }
    }
  }
  */ 
  return true; // Se permite acceso
};
