// ============================================================================
// api/hilito.js — Hilito con Groq (función serverless de Vercel, ESM).
//
// El catálogo (src/data/products.js) es la ÚNICA fuente de verdad: la función
// lo importa y lo mete en el prompt del modelo. Cuando los datos de ejemplo se
// sustituyan por los reales, Hilito responde con los reales sin tocar nada.
//
// Sin GROQ_API_KEY, o si Groq falla, devuelve { fallback: true } (HTTP 200)
// y el frontend usa la respuesta simulada local (src/lib/hilito.js).
// La clave NUNCA va en el código: es variable de entorno en Vercel.
// ============================================================================
import { CATEGORIES, PRODUCTS, STORE, WA_NUMBER } from '../src/data/products.js'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant'

// Catálogo resumido para el prompt: solo lo que el modelo necesita para
// responder (nombre, categoría, precio, disponibilidad, material/medidas).
function catalogForPrompt() {
  const categoryName = (id) => CATEGORIES.find((c) => c.id === id)?.name || id
  const stockText = { ok: 'disponible', low: 'pocas unidades', order: 'se cose por encargo' }
  return {
    tienda: STORE.name,
    categorias: CATEGORIES.map((c) => c.name),
    productos: PRODUCTS.map((p) => ({
      nombre: p.name,
      categoria: categoryName(p.cat),
      precio_cup: p.price,
      disponibilidad: stockText[p.stock] || p.stock,
      detalles: p.meta,
      descripcion: p.desc,
    })),
  }
}

function buildSystemPrompt() {
  const catalog = JSON.stringify(catalogForPrompt(), null, 1)
  return `Eres Hilito, el asistente de la tienda "${STORE.name}" (costura hecha a mano, Cuba).
Hablas en español, con tono cálido y cercano, y respondes en pocas frases.

REGLAS (no las rompas nunca):
- Responde SOLO con los datos del catálogo de abajo: precios, materiales,
  medidas y disponibilidad salen de ahí. NUNCA inventes un precio, un
  material, una medida ni una disponibilidad que no esté en el catálogo.
- Si la pregunta es sobre algo que no está en el catálogo, dilo claro y
  sugiere preguntar por WhatsApp a la tienda.
- El pedido se hace por WhatsApp y se paga al recibir (efectivo o
  Transfermóvil). No hay pagos en línea.
- No inventes productos, no prometas plazos ni envíos: la entrega y los
  encargos a medida se coordinan por WhatsApp.

CATÁLOGO:
${catalog}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const key = process.env.GROQ_API_KEY
  if (!key) {
    // Sin clave: el frontend usa la respuesta simulada local.
    res.status(200).json({ fallback: true })
    return
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  }
  const message = String(body?.message || '').slice(0, 1000)
  const cart = body?.cart && typeof body.cart === 'object' ? body.cart : {}
  if (!message.trim()) {
    res.status(200).json({ fallback: true })
    return
  }

  // Contexto del carrito, para que pueda responder qué lleva el cliente.
  const cartLines = Object.entries(cart)
    .map(([id, qty]) => {
      const p = PRODUCTS.find((x) => x.id === id)
      return p ? `${qty} × ${p.name}` : null
    })
    .filter(Boolean)
  const cartNote =
    cartLines.length > 0
      ? `\n\nEl cliente lleva en el carrito: ${cartLines.join('; ')}.`
      : ''

  try {
    const r = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          { role: 'user', content: message + cartNote },
        ],
        temperature: 0.3,
        max_tokens: 300,
      }),
    })
    if (!r.ok) {
      res.status(200).json({ fallback: true })
      return
    }
    const data = await r.json()
    const text = data?.choices?.[0]?.message?.content?.trim()
    if (!text) {
      res.status(200).json({ fallback: true })
      return
    }
    res.status(200).json({ text })
  } catch {
    res.status(200).json({ fallback: true })
  }
}
