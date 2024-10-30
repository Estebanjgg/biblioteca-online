
# Biblioteca Virtual

Este es un sistema de gestión de una biblioteca virtual donde puedes administrar libros, autores, categorías, usuarios y préstamos. La aplicación permite la creación, edición y eliminación de registros y proporciona un panel de control (Dashboard) para obtener una visión general de la actividad de la biblioteca.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Uso](#uso)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Características

- **CRUD de Libros**: Añadir, editar y eliminar información de libros, incluyendo precios de compra y alquiler.
- **CRUD de Autores y Categorías**: Gestionar autores y categorías con facilidad.
- **Gestión de Usuarios**: Registro y edición de usuarios de la biblioteca.
- **Préstamos y Compras**: Sistema de préstamos con fecha de devolución y cálculo de multas por retraso. Incluye un sistema de descuentos para usuarios frecuentes.
- **Dashboard**: Panel de control con gráficos y estadísticas sobre los préstamos, categorías más populares, y libros más prestados.
- **Footer Responsivo**: Footer atractivo con enlaces a redes sociales y derechos reservados.

## Tecnologías

Este proyecto está construido con las siguientes tecnologías:

- **React**: Framework principal para la interfaz de usuario.
- **Material-UI**: Biblioteca de componentes para el diseño visual.
- **React Router**: Manejo de rutas para navegar entre páginas.
- **Recharts**: Biblioteca para generar gráficos en el Dashboard.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Estebanjgg/biblioteca-online.git
   ```
2. Instala las dependencias:

   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:

   ```bash
   npm start
   ```
4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Estructura del Proyecto

```plaintext
biblioteca-virtual/
├── public/                  # Archivos públicos
├── src/
│   ├── components/          # Componentes reutilizables como Navbar, Footer
│   ├── pages/               # Páginas principales de la aplicación
│   ├── services/            # Servicios para la gestión de datos
│   ├── validators/          # Validadores de formularios
│   ├── App.js               # Componente principal
│   └── index.js             # Punto de entrada
└── README.md                # Documentación del proyecto
```

## Uso

1. **Dashboard**: Visualiza un resumen de la actividad de la biblioteca, con gráficos de categorías y préstamos.
2. **Gestión de Libros**: Añade o edita información sobre libros. Incluye precios específicos para compra y alquiler.
3. **Préstamos y Compras**: Registra préstamos con fecha de devolución. Se calcula automáticamente una multa del 5% por retrasos en la devolución y se aplica un descuento del 15% para usuarios frecuentes al comprar libros.
4. **Gestión de Usuarios**: Administra usuarios y verifica si son usuarios frecuentes.

## Contribución

Si deseas contribuir al proyecto:

1. Haz un fork del repositorio.
2. Crea una nueva branch (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Haz push a la branch (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Puedes ver más detalles en el archivo LICENSE.
