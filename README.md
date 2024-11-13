# Proyecto de Frontend en React - Academy

<p align="left">
   <img src="https://img.shields.io/badge/STATUS-EN%20DESAROLLO-blue">
  <img src="https://img.shields.io/badge/FRONTEND-REACT.JS-orange">
  <img src="https://img.shields.io/badge/VITE%20-green">
   <img src="https://img.shields.io/badge/AXIOS%20-green">
</p>

Este proyecto es un frontend construido en **React** con **Vite** y **Material UI**. Su propósito principal es mostrar una lista de cursos que se obtienen desde un backend, permitiendo a los usuarios aplicar filtros, paginar y ver detalles de cada curso.

## Características Principales

- **Visualización de Cursos**: Muestra una lista de cursos en formato de tarjetas cuadradas.
- **Filtros**: Permite a los usuarios filtrar los cursos por `cátedra` y `horas` desde el escritorio o un panel deslizable en dispositivos móviles.
- **Paginación**: Permite cambiar entre páginas, mostrando una cantidad adaptable de cursos por página.
- **Adaptabilidad para Móviles**: La interfaz es completamente responsiva, y los filtros se manejan de forma diferente en dispositivos móviles y de escritorio.

## Tecnologías Utilizadas

- **React**: Biblioteca principal para la construcción de la interfaz de usuario.
- **Vite**: Herramienta de desarrollo rápida para aplicaciones de frontend en React.
- **Material UI**: Biblioteca de componentes de interfaz de usuario para React, utilizada para proporcionar componentes de diseño moderno y responsivo.
- **Yarn**: Administrador de paquetes utilizado para gestionar dependencias.
- **Axios**: Librería utilizada para realizar solicitudes HTTP al backend.

## Estructura del Proyecto

## Instalación

1. Clona el repositorio en tu máquina local.
   ```bash
   git clone https://github.com/usuario/repositorio-frontend-cursos.git

2. Navega a la carpeta del proyecto.
   ```bash
   cd repositorio-frontend-cursos

3. Instala las dependencias con Yarn.
   ```bash
   yarn install
   
4. Crea un archivo .env en la raíz del proyecto y configura la URL de tu backend:
   ```bash
   VITE_BACKEND_URL=https://tu-backend-api.com

5. Inicia el proyecto.
   ```bash
   yarn dev

6. Abre http://localhost:5173 en tu navegador para ver el proyecto en acción.

## Scripts Disponibles
- yarn dev: Inicia el proyecto en modo desarrollo.
- yarn build: Construye el proyecto para producción.
- yarn preview: Sirve una vista previa de la aplicación de producción.

## Adaptabilidad y Responsividad
El proyecto está diseñado para ser responsivo, utilizando useMediaQuery para detectar el tamaño de pantalla y ajustar la visualización de filtros y el número de cursos mostrados por página:

-  Versión Escritorio: Los filtros se muestran en pantalla, y la paginación permite hasta 10 cursos por página.
-  Versión Móvil: Los filtros están dentro de un Drawer deslizable y la paginación permite 6 cursos por página.

