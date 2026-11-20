# Hilos de Abuela — tienda de costura artesanal

Tienda online de la abuela de Yoan: paños de cocina y de baño, muñecos de
tela y abanicos, hechos a mano. El pedido sale por WhatsApp y se paga al
recibir (efectivo o Transfermóvil). Sin pasarela de pago, sin base de datos,
sin cuentas: catálogo estático y $0 de costo mensual.

## Stack

- React 19 + Vite 7 + Tailwind CSS v4 (con modo oscuro por clase `.dark`)
- Sin backend, sin Supabase (el free tier de Yoan ya tiene 2 proyectos)
- Despliegue: Vercel Hobby, https://hilos-de-abuela.vercel.app
- Hilito con Groq (gratis) vía función serverless `api/hilito.js` (opcional, ver abajo)

## Cómo correrla

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # build de producción en dist/
npm run preview  # sirve el build local
```

## Estructura

```
src/
  main.jsx                 entrada
  App.jsx                  estado del carrito, carrito y chat
  index.css                paleta de la tienda (crema/terracota) + Tailwind v4
  data/products.js         TODO EL CATÁLOGO (datos de ejemplo, ver arriba)
  lib/helpers.js           formato de precios y enlace wa.me con el pedido
  lib/hilito.js            asistente Hilito: simulado (answer) + puente a Groq (askAgent)
  components/
    Header.jsx             barra superior + botón del carrito + modo oscuro
    Hero.jsx               portada
    Catalog.jsx            categorías, filtros y tarjetas de producto
    CartDrawer.jsx         panel lateral del carrito + pedido por WhatsApp
    HilitoChat.jsx         ventana del asistente
    InfoSections.jsx       historia, cómo comprar, encargos, preguntas
    Footer.jsx             pie con pago y entrega
    FloatingButtons.jsx    botones flotantes (Hilito + WhatsApp)
    icons.jsx              iconos SVG
api/hilito.js              función serverless (Vercel): Hilito con Groq
public/favicon.svg         logo de la tienda (aguja e hilo)
public/assets/             fotos de ejemplo (15: 12 de la maqueta + 3 nuevas)
```

## Datos de ejemplo

Todo el catálogo de `src/data/products.js` es DE EJEMPLO: nombre del
negocio («Hilos de Abuela» es provisional), 12 productos con precios en CUP,
fotos, historia y horario. Para publicar con datos reales basta sustituir
ese archivo y las fotos de `public/assets/`; nada más cambia.

- WhatsApp de pedidos: número que dio Yoan (+53 56915380, `WA_NUMBER` en
  `products.js`). Confirmar con la abuela antes de publicar como definitivo.
- Zona de entrega: pendiente de confirmar con la abuela.
- Categorías: Cocina, Baño, Muñecos, Abanicos, Ropa de niño y Módulos
  (Módulos aún sin piezas: se cosen por encargo).

## Hilito, el asistente

Hilito responde solo con los datos del catálogo (precios, materiales,
medidas, disponibilidad). Si no sabe algo, deriva a WhatsApp sin inventar.
El catálogo (`src/data/products.js`) es su única fuente: cuando lleguen los
datos reales, Hilito responde con los reales sin tocar nada.

Dos modos, con la misma forma de respuesta:

- **Simulado** (`answer()` en `src/lib/hilito.js`): reglas fijas sobre el
  catálogo. Funciona siempre, también sin clave y sin internet.
- **Con Groq** (`askAgent()` → `POST /api/hilito` → `api/hilito.js`): el
  modelo `llama-3.1-8b-instant` responde con el catálogo en el prompt. Si no
  hay clave o Groq falla, la función devuelve `{ fallback: true }` y el
  frontend usa la respuesta simulada. La tienda nunca se rompe por esto.

### Activar Groq (gratis, lo hace Yoan)

1. Crear una clave gratis en https://console.groq.com (cuenta gratuita).
2. En Vercel: proyecto `hilos-de-abuela` → Settings → Environment Variables
   → añadir `GROQ_API_KEY` con la clave (Production).
3. Redeploy del proyecto (Deployments → ··· → Redeploy).
4. Probar el chat en la tienda: si responde con el catálogo, está activo.

Sin la clave, la tienda sigue funcionando con las respuestas simuladas. En
desarrollo local (`npm run dev`) no existe `/api/hilito`, así que siempre
usa la simulada; para probar la función localmente, usar `vercel dev`.

## Estado

Tienda en vivo en https://hilos-de-abuela.vercel.app con datos de ejemplo.
Pendiente: datos reales (nombre, fotos, precios, WhatsApp, zona de entrega)
y activar Groq con la clave (ver arriba).
