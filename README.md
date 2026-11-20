# Hilos de Abuela — tienda de costura artesanal

Tienda online de la abuela de Yoan: paños de cocina y de baño, muñecos de
tela y abanicos, hechos a mano. El pedido sale por WhatsApp y se paga al
recibir (efectivo o Transfermóvil). Sin pasarela de pago, sin base de datos,
sin cuentas: catálogo estático y $0 de costo mensual.

## Stack

- React 19 + Vite 7 + Tailwind CSS v4
- Sin backend, sin Supabase (el free tier de Yoan ya tiene 2 proyectos)
- Despliegue previsto: Vercel Hobby (proyecto estático)

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
  lib/hilito.js            asistente Hilito SIMULADO (reglas sobre el catálogo)
  components/
    Header.jsx             barra superior + botón del carrito
    Hero.jsx               portada
    Catalog.jsx            categorías, filtros y tarjetas de producto
    CartDrawer.jsx         panel lateral del carrito + pedido por WhatsApp
    HilitoChat.jsx         ventana del asistente
    InfoSections.jsx       historia, cómo comprar, encargos, preguntas
    Footer.jsx             pie con pago y entrega
    FloatingButtons.jsx    botones flotantes (Hilito + WhatsApp)
    icons.jsx              iconos SVG
public/assets/             fotos de ejemplo (12, de la maqueta)
```

## Datos de ejemplo

Todo el catálogo de `src/data/products.js` es DE EJEMPLO: nombre del
negocio («Hilos de Abuela» es provisional), 10 productos con precios en CUP,
fotos, historia y horario. Para publicar con datos reales basta sustituir
ese archivo y las fotos de `public/assets/`; nada más cambia.

- WhatsApp de pedidos: **PLACEHOLDER** — por ahora el de Yoan
  (+53 51877879, `WA_NUMBER` en `products.js`). Cambiar antes de publicar.
- Zona de entrega: pendiente de confirmar con la abuela.

## Hilito, el asistente

Hoy es **simulado**: responde con reglas fijas y solo con los datos del
catálogo (precios, materiales, medidas, disponibilidad). Si no sabe algo,
deriva a WhatsApp sin inventar. En un paso posterior se conecta a Groq
(gratis) con este mismo catálogo como única fuente; la interfaz de
`src/lib/hilito.js` (`answer()`) está pensada para no cambiar.

## Estado

Paso 1 (este build): scaffold + tienda funcionando con datos de ejemplo.
Pendiente: datos reales, conectar Hilito a Groq, desplegar en Vercel.
