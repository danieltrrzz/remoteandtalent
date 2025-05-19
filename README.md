# **Autor** [Daniel Felipe Torres Vanegas](https://www.linkedin.com/in/daniel-felipe-torres-vanegas-a8237419a/)

## Prueba técnica frontend Angular
Aplicación para explorar países mediante la API pública de REST Countries, con funcionalidades de búsqueda, filtrado, detalle por país y gestión de favoritos.

## 📋 Descripción
Esta aplicación Angular permite visualizar y buscar información sobre países del mundo. Incluye detalle de cada país, filtrado por región, búsqueda por nombre, gestión de favoritos y una experiencia optimizada para rendimiento y accesibilidad.

## 🚀 Instalación y ejecución
Clona el repositorio e instala las dependencias:
```bash
git clone <https://remote-talent.git>
cd <remote-talent>
npm install
```

## 🖥️ Desarrollo local
```bash
npm start
```

## 👾 Pruebas unitarias con cobertura
```bash
npm run test
```

## 🤖 Build para producción
```bash
npm run build-prod
```

## 🐋 Construir Imágen en Docker
Asegúrate de estar en la raíz del proyecto. El directorio contiene un Dockerfile, ejecuta el siguiente comando para construir la imágen Docker.
```bash
docker build -t remotetalent:latest .
```

### Levantar los Servicios con Docker Compose
Una vez que hayas construido la imágen, puedes levantar el servicio utilizando Docker Compose. Ejecuta el siguiente comando desde la raíz del proyecto:

```bash
docker-compose -f compose.yaml up
```
Este comando descargará la imágen (si no está ya presente) y levantará el contenedor.

### Verificar que el servicio esta corriendo
Este seria el resultado una vez que Docker Compose haya iniciado el servicio:

- remotetalent: http://host:80

## 📝 Decisiones técnicas y arquitectura
### Estructura modular
- CoreModule: Servicios singleton e interceptores.
- SharedModule: Componentes reutilizables.
- ListadoModule: Listado de países (lazy loaded).
### Gestión de estado
- Se usaron Angular Signals por ser una solución reactiva, eficiente y nativa al framework. Permite una implementación más sencilla y ligera que NgRx, sin sacrificar control ni escalabilidad.
### Gestión de estado
- Búsqueda con debounce y mínimo 3 caracteres.
- Dropdown para región.
- Virtual Scroll con Angular CDK para listas de más de 50 países.
- Ruta /country/:name para detalle individual.
### Performance
- Lazy loading en rutas.
### SCSS y diseño responsive:
- Diseño basico y enfoque mobile-first.
- Breakpoints: ≤600px (móvil), 600–1024px (tablet), ≥1024px (escritorio).
- Variables y estructura modular para escalabilidad de estilos.

## 🧪 Tecnologías y herramientas
- Angular 19
- Angular Signals
- Angular Router (Lazy Loading)
- Angular CDK Virtual Scroll
- REST Countries API
- SCSS modular
- Karma + Jasmine para pruebas unitarias
