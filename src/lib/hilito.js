// ============================================================================
// HILITO — ASISTENTE SIMULADO (placeholder).
// Hoy responde con reglas fijas y SOLO con los datos de products.js: precios,
// materiales, medidas y disponibilidad salen del catálogo, nunca inventados.
// En un paso posterior se conecta a Groq (gratis) con este mismo catálogo
// como única fuente; la interfaz de este módulo (answer()) no cambia.
// ============================================================================
import { PRODUCTS, STOCK_TEXT, productById } from '../data/products'
import { fmt, waLink } from './helpers'

const norm = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

const has = (t, words) => words.some((w) => t.includes(w))

function findProduct(t) {
  let found = null
  for (const p of PRODUCTS) {
    for (const k of p.keys) {
      if (t.includes(norm(k))) found = p
    }
  }
  if (found) return found
  if (has(t, ['delantal'])) return productById('p4')
  // "muñeca" y "abanico" son ambiguos (hay dos de cada uno): no se elige uno.
  return null
}

// Respuesta del asistente. Devuelve:
//   { text }                     -> mensaje de texto
//   { text, product }            -> texto + tarjeta del producto (con botón Añadir)
//   { text, waText }             -> texto + botón "Seguir por WhatsApp"
// cart: { [id]: cantidad } — solo se usa para decir qué lleva en el carrito.
export function answer(raw, cart) {
  const t = norm(raw)

  if (/^(hola|buenas|buenos dias|hey|saludos)\b/.test(t) && t.length < 30) {
    return {
      text: '¡Hola! Qué bueno verte por la tienda. ¿Buscas algo para la cocina, el baño, una muñeca o un abanico para el calor?',
    }
  }
  if (has(t, ['gracias'])) {
    return { text: '¡De nada! Si necesitas algo más, aquí sigo entre hilos y botones.' }
  }

  if (has(t, ['encargo', 'a medida', 'personaliz', 'iniciales', 'otro color', 'otra tela'])) {
    return {
      text: '¡Claro que sí! Los encargos son la especialidad de la abuela: colores, medidas, iniciales bordadas o una muñeca especial. Suelen tardar de 3 a 7 días según la pieza.\nCuéntale tu idea por WhatsApp y te dice precio y tiempo exactos.',
      waText: 'Hola, quiero pedir un encargo a medida en Hilos de Abuela. Mi idea es: ',
    }
  }
  if (has(t, ['pago', 'pagar', 'transfermovil', 'efectivo', 'tarjeta'])) {
    return {
      text: 'Pagas al recibir tu pedido, en efectivo o por Transfermóvil, como prefieras. No hace falta pagar nada por adelantado en los productos del catálogo.',
    }
  }
  if (has(t, ['envio', 'entrega', 'domicilio', 'reparto', 'llega', 'recoger', 'direccion'])) {
    return {
      text: 'La entrega se coordina por WhatsApp al confirmar el pedido: punto de encuentro o mensajería según tu zona, y ahí te decimos si tiene costo adicional antes de cerrar nada.',
      waText: 'Hola, quiero consultar la entrega de un pedido de Hilos de Abuela. Mi zona es: ',
    }
  }
  if (has(t, ['horario', 'hora', 'abren', 'atienden', 'cuando'])) {
    return {
      text: 'La tienda atiende de lunes a sábado, de 9:00 a. m. a 6:00 p. m. Por WhatsApp puedes escribir en cualquier momento y te respondemos en ese horario.',
    }
  }

  // Producto concreto (precio, disponibilidad, material o añadir al carrito).
  const p = findProduct(t)
  if (p) {
    if (has(t, ['quiero', 'comprar', 'anade', 'agrega', 'pido', 'pedir', 'llevo'])) {
      return { text: `¡Listo! Te añado «${p.name}» al carrito. Cuando termines, pulsa el carrito y envía el pedido por WhatsApp.`, product: p, addToCart: true }
    }
    if (has(t, ['precio', 'cuesta', 'vale', 'cuanto'])) {
      return {
        text: `«${p.name}» cuesta ${fmt(p.price)}. Estado: ${STOCK_TEXT[p.stock].toLowerCase()}. ¿Te lo añado al carrito?`,
        product: p,
      }
    }
    if (has(t, ['hay', 'queda', 'disponible', 'stock'])) {
      return {
        text: `De «${p.name}»: ${STOCK_TEXT[p.stock].toLowerCase()}. Cuesta ${fmt(p.price)}.`,
        product: p,
      }
    }
    if (has(t, ['material', 'tela', 'medida', 'tamano', 'grande', 'de que es', 'algodon', 'lino'])) {
      return {
        text: `«${p.name}» — ${p.meta}. ${p.desc} Cuesta ${fmt(p.price)}.`,
        product: p,
      }
    }
    return {
      text: `«${p.name}»: ${p.desc}\n${p.meta} · ${fmt(p.price)} · ${STOCK_TEXT[p.stock]}.`,
      product: p,
    }
  }

  // Categorías enteras (precios sacados del catálogo, no escritos a mano).
  if (has(t, ['muneca', 'munecas', 'muneco'])) {
    const rosita = productById('p7')
    const carmen = productById('p8')
    return {
      text: `Hay dos muñecas de trapo, ambas con carita bordada y sin piezas pequeñas:\n• «Rosita», 45 cm — ${fmt(rosita.price)}\n• «Carmen», 35 cm — ${fmt(carmen.price)} (quedan pocas)\nDime cuál te gusta y te cuento más o te la añado al carrito.`,
    }
  }
  if (has(t, ['abanico', 'abanicos', 'calor'])) {
    const granate = productById('p9')
    const verde = productById('p10')
    return {
      text: `Para el calor hay dos abanicos de tela hechos a mano:\n• Granate con varillas de madera — ${fmt(granate.price)}\n• Verde con varillas de bambú — ${fmt(verde.price)}\n¿Cuál prefieres?`,
    }
  }
  if (has(t, ['bano', 'toalla', 'toallas'])) {
    const b3 = productById('p5')
    const b4 = productById('p6')
    return {
      text: `Para el baño hay dos juegos:\n• Juego bordado de 3 piezas, color crema — ${fmt(b3.price)}\n• Juego «Parche floral» de 4 piezas, por encargo — ${fmt(b4.price)}\n¿Quieres detalles de alguno?`,
    }
  }
  if (has(t, ['cocina', 'pano', 'panos', 'delantal'])) {
    const list = PRODUCTS.filter((x) => x.cat === 'cocina')
      .map((x) => `• ${x.name} — ${fmt(x.price)}${x.stock === 'low' ? ' (quedan pocos)' : ''}`)
      .join('\n')
    return { text: `En la cocina encontrarás:\n${list}\nPregúntame por cualquiera y te doy material y medidas.` }
  }
  if (has(t, ['que venden', 'que hay', 'catalogo', 'productos', 'venden'])) {
    const prices = PRODUCTS.map((x) => x.price)
    return {
      text: `La abuela cose cuatro cosas: paños de cocina, juegos de baño, muñecas de trapo y abanicos de tela. Todo hecho a mano, con precios entre ${fmt(Math.min(...prices))} y ${fmt(Math.max(...prices))}. ¿Por dónde empezamos?`,
    }
  }
  if (has(t, ['carrito'])) {
    const ids = Object.keys(cart)
    const n = ids.reduce((s, id) => s + cart[id], 0)
    if (n === 0) return { text: 'Tu carrito está vacío todavía. Añade lo que te guste desde el catálogo y yo te ayudo con las dudas.' }
    const total = ids.reduce((s, id) => s + productById(id).price * cart[id], 0)
    return {
      text: `Llevas ${n} pieza(s) por ${fmt(total)}. Pulsa el botón del carrito, arriba, para enviar el pedido por WhatsApp.`,
    }
  }

  // No sabe: deriva a la abuela por WhatsApp, SIN inventar una respuesta.
  return {
    text: 'Eso no lo tengo en mi catálogo y no quiero inventarte una respuesta. La abuela sí lo sabe seguro: pregúntale por WhatsApp y te responde en su horario (lun a sáb, 9:00 a. m. – 6:00 p. m.).',
    waText: `Hola, tengo una pregunta sobre la tienda Hilos de Abuela: ${raw}`,
  }
}

export function waLinkFor(waText) {
  return waLink(waText)
}

export const SUGGESTIONS = [
  '¿Cuánto cuesta la muñeca Rosita?',
  '¿Qué paños de baño hay?',
  '¿Hacen encargos a medida?',
  '¿Cómo pago?',
]
