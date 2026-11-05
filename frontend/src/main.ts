/**
 * Este archivo es el punto de entrada principal de la aplicación Angular.
 * Se encarga de arrancar la aplicación y aplicar la configuración inicial.
 *
*/
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
