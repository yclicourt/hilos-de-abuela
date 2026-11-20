import { WA_NUMBER } from '../data/products'

// Precio en CUP con separador de miles: 1500 -> "1 500 CUP"
export function fmt(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' CUP'
}

// Enlace wa.me con el mensaje ya escrito.
export function waLink(text) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}

// Texto del pedido completo para WhatsApp, a partir del carrito.
// cart: { [productId]: cantidad }
export function orderMessage(cart, products, buyerName) {
  const lines = ['Hola, quiero hacer un pedido en Hilos de Abuela:', '']
  let total = 0
  for (const [id, qty] of Object.entries(cart)) {
    const p = products.find((x) => x.id === id)
    if (!p) continue
    total += p.price * qty
    lines.push(`• ${qty} × ${p.name} — ${fmt(p.price * qty)}`)
  }
  lines.push('', `Total: ${fmt(total)}`)
  if (buyerName) lines.push(`Mi nombre es ${buyerName}.`)
  lines.push('Quedo atento/a a la confirmación. ¡Gracias!')
  return lines.join('\n')
}
