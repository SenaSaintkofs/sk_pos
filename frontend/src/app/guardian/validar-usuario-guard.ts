import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const validarUsuarioGuard: CanActivateFn = (route, state) => {

  const router = inject(Router); // inject replaza construcotr en funciones
  const idUser = sessionStorage.getItem('id'); // Capturar ID
  const rolUser = sessionStorage.getItem('rol'); // Capturar ROL
  const rutaActual = state.url; // Capturar la ruta actual

  if (!idUser) {
    router.navigate(['login']);
    return false;
  }

  // CLIENTE solo debe ir a dashboard-
  if (rolUser === 'CLIENTE' && !rutaActual.includes('/dashboard')) {
    router.navigate(['dashboard']);
    return false;
  }

  if (rolUser === 'EMPLEADO') {
    if (rutaActual.includes('/usuarios') || rutaActual.includes('/categorias') || rutaActual.includes('/reportes')) {
      router.navigate(['dashboard']);
      return false;
    }
  }
  return true;
}
