# Saintkofs - SKPOS

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%234479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

> **NOTE**
> Sistema de información Web tipo POS (Point of Sale) diseñado para la automatización, control operacional, gestión de inventarios y facturación en tiempo real para microcomercios. Desarrollado como proyecto de grado bajo estándares técnicos.

---

## Índice de Contenidos
- [Características Destacadas](#-características-destacadas)
- [Stack Tecnológico](#-stack-tecnológico)
- [Optimizaciones de Arquitectura](#-optimizaciones-de-arquitectura)
- [Despliegue y Pruebas](#-despliegue-y-pruebas)
- [Ejecución Local con Contenedores (Podman / Docker)](#-ejecución-local-Ejecución-Local (Run Locally))
- [Licencia del Proyecto](#-licencia-del-proyecto)
- 

---

## Características

- **Gestión de Ventas:** Facturación ágil en puntos de venta físicos.
- **Control de Inventario:** Monitoreo y actualización automática de stock.
- **Arquitectura Distribuida:** Backend centralizado y consumo eficiente de endpoints.
- **Seguridad CORS Exclusiva:** Protección de API restringida al dominio oficial del ecosistema.
- **Compatibilidad Móvil:** Listo para compilar e instalar en dispositivos Android mediante APK.

---

## Stack Tecnológico

| Capa de Software | Tecnologías Utilizadas |
| :--- | :--- |
| **Frontend (Cliente)** | Angular, TypeScript, HTML5, CSS3, Tailwind CSS |
| **Backend (Servidor)** | PHP, Node.js |
| **Base de Datos** | MySQL |
| **Infraestructura** | Oracle Cloud, Caddy Server (Proxy Inverso), Cloudflare, Podman, Podman-compose |

---

## Optimizaciones de Arquitectura

Durante la fase de estabilización y despliegue del entorno de pruebas se aplicaron las siguientes mejoras de arquitectura:

- **Centralización de API en Angular:** Creación de `src/app/config/api.ts` (`API_CONFIG`) para el manejo global de `baseUrl`, eliminando endpoints hardcodeados en los servicios.
- **Centralización de CORS en PHP:** Creación de un script único de cabeceras restringido a `https://demo-pos.saintkofs.pw` implementado mediante `include_once` en los controladores principales.
- **Depuración de Sintaxis y Logs:** Corrección de estructuras SQL y manejo preventivo de inicialización de variables (`$vec = []`) para mantener los logs del servidor libres de advertencias menores **zero warnings**.

---

## Despliegue y Pruebas

### Descargar la Aplicación Móvil (APK)
Para descargar e instalar la última versión compilada a través de la plataforma **AppsGeyser**. acceda a la sección de lanzamientos del repositorio: 
**[Descargar Última Versión APK](../../releases)**

### Ejecutar la Demo Web
El sistema se encuentra desplegado y funcional utilizando una infraestructura en la nube respaldada por **Oracle Cloud**, con **Caddy Server** como proxy inverso y la capa de seguridad de **Cloudflare**:
**[Acceder a la Demo en Vivo](https://demo-pos.saintkofs.pw)**

---

## Ejecución Local (Run Locally)

Este repositorio cuenta con soporte multiplataforma a través de contenedores aislados mediante el archivo `compose.yml` provisto en la raíz.

### Instrucciones de Despliegue Rápido:

1. Clone este repositorio.
```bash
  git clone https://github.com/SenaSaintkofs/sk_pos.git
```
2. Entre al directorio del proyecto
```bash
  cd sk_pos
```
```bash
# Opción A: Si utiliza Podman (Entorno Rootless Recomendado)
podman-compose up --build -d

# Opción B: Si utiliza Docker clásico
docker-compose up --build
```

Una vez completada la inicialización de los servicios:
*   El **Módulo Frontend (Angular):** Disponible localmente en `http://localhost:4200`
*   El **Módulo Backend (PHP API):** Disponible localmente en `http://localhost:8080`

---

## Licencia del Proyecto

Este proyecto se encuentra registrado bajo la Licencia **MIT**. Es de código abierto y uso completamente libre para fines académicos, de estudio y desarrollo de software.

> [![GitHub repo size](https://img.shields.io/github/repo-size/SenaSaintkofs/sk_pos?style=flat-square)](https://github.com/SenaSaintkofs/sk_pos)
> [![GitHub last commit](https://img.shields.io/github/last-commit/SenaSaintkofs/sk_pos?style=flat-square)](https://github.com/SenaSaintkofs/sk_pos)
> [![GitHub license](https://img.shields.io/github/license/SenaSaintkofs/sk_pos?style=flat-square)](https://github.com/SenaSaintkofs/sk_pos)
