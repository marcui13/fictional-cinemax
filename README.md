# Movie App: Fictional Cinemax

La Movie App 'Fictional Cinemax' es una aplicación móvil desarrollada con Ionic 7 y Angular que permite a los usuarios realizar las siguientes acciones:

- Iniciar sesión y registrarse como nuevos usuarios.
- Explorar una lista de películas.
- Buscar películas.
- Ver detalles de películas, incluyendo título, descripción y año de lanzamiento.
- Editar la información de una película.
- Calificar películas.
- Cambiar el logo.

## Características

- **Inicio de Sesión y Registro**: Los usuarios pueden crear cuentas o iniciar sesión con sus credenciales para acceder a la aplicación.

- **Cambiar contraseña**: Los usuarios pueden cambiar su contraseña en caso de olvidarla, ingresando su mail y una nueva contraseña.

- **Lista de Películas**: Muestra una lista de películas disponibles con imágenes de portada y títulos.

- **Búsqueda de Películas**: Permite filtrar películas por nombre ingresando en la barra de búsqueda.

- **Edición de Películas**: Permite a los usuarios editar la descripción de las películas .

- **Calificación de Películas**: Los usuarios pueden calificar las películas con un sistema de calificación de estrellas.

- **Cambiar el logo**: Permite cambiar el logo de la app en la sección 'Settings'.

## Tecnologías Utilizadas

- **Ionic 7**: Un framework de desarrollo de aplicaciones móviles híbridas basado en Angular.

- **Angular**: Un framework de desarrollo de aplicaciones web desarrollado por Google.

## Versiones

- **Ionic Framework**: 7.0.0
- **Capacitor**: 5.4.2
- **Angular**: 16.0.0
- **NodeJS**: 16.20.2
- **npm**: 8.19.4

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/movie-app.git
   cd movie-app

   ```

2. Instala las dependencias:

   ```bash
   npm install

   ```

3. Inicia la aplicación:
   ```bash
   ionic serve
   ```

## Uso

- Regístrate o inicia sesión para comenzar a usar la aplicación.

- Puedes cambiar la contraseña del usuario, ingresando su mail y una nueva contraseña.

- Explora la lista de películas.

- Puedes editar la información de la película o calificarla desde la página de detalles.

- Puedes acceder la página de detalles al hacer swipe hacia la derecha en la película que quieras.

- Puedes cambiar el logo de la app en la opción 'Settings' del menú lateral.

## Usuarios de Ejemplo

La aplicación utiliza datos de usuarios de ejemplo para la funcionalidad de inicio de sesión y registro. A continuación se muestran algunos usuarios de ejemplo que puedes utilizar:

1. **Usuario:** John Doe

   - **Email:** jd@mail.com
   - **Contraseña:** 11223344

2. **Usuario:** Jose Pepe

   - **Email:** pepe@mail.com
   - **Contraseña:** 12345678

3. **Usuario:** Sergio Lopez
   - **Email:** sergio@mail.com
   - **Contraseña:** 5667788

Nota: En un entorno de producción, las contraseñas se almacenarían de manera segura y no en texto claro. Estos datos de ejemplo son para propósitos de desarrollo y prueba.

## Almacenamiento de Datos

La aplicación utiliza un sistema de mockup de datos para cargar y almacenar información de usuarios, películas y otras funcionalidades. Estos datos se almacenan en el almacenamiento local del navegador para una experiencia de usuario más fluida. En un entorno de producción, se utilizaría un sistema de administración de bases de datos o una API para gestionar los datos de manera segura.
