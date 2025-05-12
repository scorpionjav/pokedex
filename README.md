# Pokédex (Global66)

Este proyecto es una solución para la prueba técnica frontend de Global66, donde el objetivo es crear una lista de pokémones favoritos con una interfaz responsiva y buenas prácticas de desarrollo.

## 📚 Requerimientos de la prueba

Este proyecto fue desarrollado considerando los siguientes puntos:

- **Buena implementación de UI**: Se respetaron los principios de diseño entregados y se aplicaron estilos consistentes.
- **Arquitectura y diseño de código**: Se utilizó una estructura modular y escalable, siguiendo principios como KISS, DRY y SOLID.
- **Buenas prácticas de código**: Se implementaron herramientas como ESLint y Prettier para mantener un código limpio y legible.
- **Escalabilidad**: La solución está diseñada para manejar grandes cantidades de datos, utilizando scroll infinito y optimizando las peticiones a la API.

## 🚀 Tecnologías utilizadas

- **Vue 3** con Composition API: Para construir una interfaz moderna y modular.
- **Vite**: Un bundler rápido y eficiente, perfecto tanto para el desarrollo como para la producción.
- **TypeScript**: Usado para un tipado estático, lo que mejora la mantenibilidad y permite detectar errores de forma temprana.
- **Tailwind CSS**: Un framework de utilidades que facilita estilos rápidos y personalizados.
- **Pinia**: Un manejador de estado global que es simple y escalable.
- **Axios**: Para la interacción con APIs RESTful.
- **ESLint y Prettier**: Para asegurar que el código sea limpio y consistente.

## 🧠 Decisiones técnicas y arquitectura

1. **Manejo del estado global**:

   - Se utilizó **Pinia** para manejar el estado global de la aplicación, como los favoritos, el estado del modal y loader.
   - Cada store está modularizada, como `favorites.ts` para manejar los favoritos y `app.ts` para el estado general de la aplicación facilitando escalabilidad

2. **Consumo de API**:

   - Se creó una instancia centralizada de Axios en `/services/api.ts` para manejar las peticiones HTTP. Esto permite reutilizar la configuración y mantener el código DRY.
   - Se implementaron funciones como `getPokemons` y `getPokemonByName` para interactuar con la API de [PokéAPI](https://pokeapi.co/).

3. **Diseño modular**:

   - La aplicación está dividida en componentes reutilizables y escalables (`Button`, `Icon`, `Modal`, etc.), a su vez como vistas específicas (`List`, `PokemonCard`).
   - Cada componente tiene una responsabilidad única, siguiendo el principio de **Single Responsibility**.

4. **Escalabilidad**:

   - Se implementó scroll infinito para cargar grandes cantidades de datos de manera eficiente.
   - La arquitectura está diseñada para manejar un crecimiento en la cantidad de datos y funcionalidades.

5. **Estilos**:
   - Se utilizó **Tailwind CSS** para mantener un diseño limpio y consistente. Las clases utilitarias facilitaron el desarrollo rápido, y se añadieron estilos personalizados para casos específicos.

## 🗂️ Estructura de carpetas

```
src/
├── assets/             # Archivos estáticos como imágenes, íconos, fuentes y estilos globales
│   ├── fonts/          # Fuentes que se utilizan en la aplicación
│   ├── icons/          # Íconos en formato SVG
│   ├── images/         # Imágenes estáticas
│   ├── styles/         # Archivos CSS globales
├── components/         # Componentes reutilizables como Button, Icon, Input, Loader y Modal
├── models/             # Definiciones e interfaces en TypeScript
├── plugins/            # Configuración de plugins y shims para Vue
├── router/             # Configuración de rutas con Vue Router
├── services/           # Configuración de Axios y servicios de API
├── stores/             # Estado global administrado con Pinia
├── views/              # Vistas principales de la aplicación
│   ├── Pokemons/       # Vistas relacionadas con la funcionalidad
│       ├── FavoriteButton.vue
│       ├── List.vue
│       ├── PokemonCard.vue
├── App.vue             # Componente raíz de la aplicación
├── main.ts             # Punto de entrada principal
```

## 🎯 Funcionalidades implementadas

- ✅ **Lista de pokémones**: Los datos se obtienen desde la API pública de PokéAPI.
- ✅ **Agregar/Quitar favoritos**: Los favoritos se persisten en el estado global utilizando Pinia.
- ✅ **Botón "Compartir"**: Copia al portapapeles el nombre y atributos del pokémon.
- ✅ **Loading animado**: Se utiliza una animación de pokebola mientras se cargan los datos.
- ✅ **Búsqueda y filtrado**: Permite buscar pokémones por nombre y filtrar por favoritos.
- ✅ **Scroll infinito**: Carga más pokémones automáticamente al llegar al final de la página.
- ✅ **Modal de detalles**: Muestra información detallada de un pokémon en un modal.

## 🤖 Uso de IA en el desarrollo

La inteligencia artificial (IA) fue utilizada en varias etapas del desarrollo para optimizar el tiempo y mejorar la calidad del código, como refactorización, simplificar funciones y optimizar el uso de Tailwind CSS. Adicionalmente, en el `vscode`, lo use para generar el mensaje del commit.

PD: Incluso para ayudar a generar este documento 🫣.

## 📝 Cómo correr el proyecto

1. Clona el repositorio:

   ```bash
   git clone https://github.com/scorpionjav/pokedex.git
   cd pokedex
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre la aplicación en tu navegador en `http://localhost:5173`.
