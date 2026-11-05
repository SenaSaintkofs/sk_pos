/**
 * Este archivo define un guardia de ruta en Angular que valida el acceso de los usuarios a diferentes rutas de la aplicación.
 * El guardia verifica si el usuario está autenticado y si tiene el rol adecuado para acceder a la ruta solicitada.
 * Si el usuario no está autenticado, se redirige a la página de inicio de sesión.
 * Si el usuario tiene un rol que no le permite acceder a la ruta, se redirige a la página de dashboard.
 */

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
