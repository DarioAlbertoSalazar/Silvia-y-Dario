# Silvia & Dario · 25.09.2027

Invitación digital para la boda de Silvia y Dario.

- **Ceremonia:** 17:30 h · Parroquia San José del Barrial
- **Recepción:** 20:00 h · Chalet Barrial
- **Vestimenta:** formal
- **Mesa de regalos:** lluvia de sobres

## Contenido

Página estática sin dependencias que instalar. Incluye cuenta regresiva, itinerario con enlaces a Google Maps, botón para guardar en Google Calendar, animaciones al hacer scroll y modo oscuro automático.

```
index.html        contenido: textos, secciones y enlaces
css/styles.css    colores, tipografías y animaciones
js/main.js        cuenta regresiva, efectos de scroll, pétalos y nombres
```

## Cómo verla

Abre `index.html` en cualquier navegador. Mantén las carpetas `css` y `js` junto a él.

Para publicarla con GitHub Pages: **Settings → Pages → Branch: `main` / root → Save**. La invitación queda en `https://<usuario>.github.io/<repositorio>/`.

## Cómo editar

- **Nombres y fecha:** el objeto `BODA` al inicio de `js/main.js`.
- **Colores y tipografías:** las variables del bloque `:root` en `css/styles.css`.
- **Textos, horarios y ubicaciones:** `index.html`.
