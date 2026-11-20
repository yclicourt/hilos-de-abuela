// ============================================================================
// DATOS DE EJEMPLO — todo lo de este archivo es de muestra.
// Cuando lleguen los datos reales de la abuela (nombre del negocio, fotos,
// precios, WhatsApp de pedidos, zona de entrega), se sustituye SOLO este
// archivo: el resto de la tienda no cambia.
// ============================================================================

// Número de WhatsApp que recibe los pedidos (sin +, con código de país 53).
// Número que dio Yoan (56915380). Confirmar con la abuela antes de
// publicar como definitivo.
export const WA_NUMBER = '5356915380'

export const STORE = {
  name: 'Hilos de Abuela',
  tagline: 'Costura hecha a mano',
  // Zona de entrega: PENDIENTE de confirmar con la abuela.
  deliveryZone: 'La Habana (zona por confirmar)',
  hours: 'Lun a sáb, 9:00 a. m. – 6:00 p. m.',
  paymentMethods: ['Pago contra entrega (efectivo)', 'Transfermóvil'],
}

// Categorías del catálogo. "img" apunta a /public/assets.
export const CATEGORIES = [
  {
    id: 'cocina',
    name: 'Cocina',
    img: '/assets/set-panos-lino.jpg',
    alt: 'Paños de cocina de lino colgados en la cocina',
  },
  {
    id: 'bano',
    name: 'Baño',
    img: '/assets/set-bano-bordado.jpg',
    alt: 'Juego de paños de baño color crema con bordado',
  },
  {
    id: 'munecos',
    name: 'Muñecos',
    img: '/assets/muneca-carmen.jpg',
    alt: 'Muñeca de tela con vestido estampado y lazos',
  },
  {
    id: 'abanicos',
    name: 'Abanicos',
    img: '/assets/abanico-verde.jpg',
    alt: 'Abanico de tela verde con varillas de bambú',
  },
  {
    id: 'ninos',
    name: 'Ropa de niño',
    img: '/assets/vestido-nina.jpg',
    alt: 'Vestido de niña de algodón blanco con flores bordadas',
  },
  {
    id: 'modulos',
    name: 'Módulos',
    img: '/assets/modulos.jpg',
    alt: 'Pila de textiles doblados para el hogar en crema, verde y terracota',
  },
]

// stock: "ok" = disponible · "low" = pocas unidades · "order" = se cose por encargo
// "keys": palabras que Hilito usa para reconocer el producto en una pregunta.
export const PRODUCTS = [
  {
    id: 'p1',
    cat: 'cocina',
    name: 'Paño de cocina «Flores silvestres»',
    desc: 'Algodón grueso con una cenefa de flores bordada a mano. Aguanta el uso diario y se lava sin problema.',
    meta: 'Algodón · 40 × 60 cm',
    price: 350,
    stock: 'ok',
    img: '/assets/pano-cocina-flores.jpg',
    alt: 'Paño de cocina blanco con flores bordadas a mano',
    keys: ['flores silvestres', 'pano flores', 'flores'],
  },
  {
    id: 'p2',
    cat: 'cocina',
    name: 'Paño de cocina «Fresas»',
    desc: 'Mezcla de lino y algodón con fresas bordadas en una esquina. De los que da gusto colgar a la vista.',
    meta: 'Lino y algodón · 45 × 65 cm',
    price: 320,
    stock: 'ok',
    img: '/assets/pano-cocina-fresas.jpg',
    alt: 'Paño de cocina colgado con fresas bordadas',
    keys: ['fresas', 'fresa'],
  },
  {
    id: 'p3',
    cat: 'cocina',
    name: 'Juego de 3 paños de lino',
    desc: 'Tres paños de lino color crema, cada uno con su florecita bordada. Ideales para regalo o para estrenar cocina.',
    meta: 'Lino · 3 piezas de 45 × 65 cm',
    price: 900,
    stock: 'low',
    img: '/assets/set-panos-lino.jpg',
    alt: 'Tres paños de cocina de lino con bordados florales',
    keys: ['juego de 3', 'tres panos', 'set de panos', 'lino'],
  },
  {
    id: 'p4',
    cat: 'cocina',
    name: 'Delantal de lino «Campo»',
    desc: 'Delantal mostaza de lino con flores silvestres bordadas en el pecho y los bolsillos. Se ata a la cintura.',
    meta: 'Lino · Talla única ajustable',
    price: 850,
    stock: 'ok',
    img: '/assets/delantal-lino.jpg',
    alt: 'Delantal de lino mostaza con flores bordadas',
    keys: ['delantal', 'campo'],
  },
  {
    id: 'p5',
    cat: 'bano',
    name: 'Juego de baño bordado (3 piezas)',
    desc: 'Toalla de baño, de manos y de cara en algodón color crema, con cenefa bordada y calada a mano.',
    meta: 'Algodón · 3 piezas',
    price: 1500,
    stock: 'ok',
    img: '/assets/set-bano-bordado.jpg',
    alt: 'Juego de toallas de baño crema con bordado, apiladas',
    keys: ['juego de bano', 'toallas', 'bano bordado'],
  },
  {
    id: 'p6',
    cat: 'bano',
    name: 'Juego de baño «Parche floral» (4 piezas)',
    desc: 'Dos toallas grandes grises y dos de manos blancas, con parche acolchado y flores bordadas. Se cose por encargo.',
    meta: 'Algodón rizado · 4 piezas',
    price: 1800,
    stock: 'order',
    img: '/assets/set-bano-floral.jpg',
    alt: 'Juego de toallas grises y blancas con parche floral bordado',
    keys: ['parche floral', 'bano floral', 'cuatro piezas'],
  },
  {
    id: 'p7',
    cat: 'munecos',
    name: 'Muñeca de trapo «Rosita»',
    desc: 'La clásica de la casa: trenzas de estambre, vestido rosa de flores y zapatitos con lazo. Suave y sin piezas pequeñas.',
    meta: 'Tela y estambre · 45 cm',
    price: 1500,
    stock: 'ok',
    img: '/assets/muneca-rosita.jpg',
    alt: 'Muñeca de trapo con trenzas y vestido rosa de flores',
    keys: ['rosita', 'muneca rosa'],
  },
  {
    id: 'p8',
    cat: 'munecos',
    name: 'Muñeca de trapo «Carmen»',
    desc: 'Vestido lavanda con faldellín, moños rojos en las trenzas y carita bordada. Lista para ser la favorita de alguien.',
    meta: 'Tela y estambre · 35 cm',
    price: 1200,
    stock: 'low',
    img: '/assets/muneca-carmen.jpg',
    alt: 'Muñeca de trapo con vestido lavanda y moños rojos',
    keys: ['carmen', 'muneca lavanda'],
  },
  {
    id: 'p9',
    cat: 'abanicos',
    name: 'Abanico de tela granate',
    desc: 'Tela granate con varillas de madera clara. Grande, firme y de los que sí echan aire de verdad.',
    meta: 'Tela y madera · 23 cm cerrado',
    price: 450,
    stock: 'ok',
    img: '/assets/abanico-rojo.jpg',
    alt: 'Abanico abierto de tela granate con varillas de madera',
    keys: ['granate', 'rojo', 'abanico granate'],
  },
  {
    id: 'p10',
    cat: 'abanicos',
    name: 'Abanico de tela verde y bambú',
    desc: 'Tela verde fresca con varillas de bambú caladas. Ligero para llevar en el bolso todo el verano.',
    meta: 'Tela y bambú · 21 cm cerrado',
    price: 400,
    stock: 'ok',
    img: '/assets/abanico-verde.jpg',
    alt: 'Abanico abierto de tela verde con varillas de bambú',
    keys: ['verde', 'bambu', 'abanico verde'],
  },
  {
    id: 'p11',
    cat: 'ninos',
    name: 'Vestido de niña «Florecitas»',
    desc: 'Vestido blanco de algodón con florecitas bordadas a mano, botones de madera y vuelo amplio. Para los días de fiesta y para todos los días.',
    meta: 'Algodón · Talla 4–6 años',
    price: 1200,
    stock: 'ok',
    img: '/assets/vestido-nina.jpg',
    alt: 'Vestido de niña blanco con flores bordadas colgado en una percha de madera',
    keys: ['vestido', 'nina', 'florecitas', 'vestido de nina'],
  },
  {
    id: 'p12',
    cat: 'ninos',
    name: 'Conjunto de bebé «Nube»',
    desc: 'Body y pantalón de algodón suave color crema, con una florecita bordada. Cómodo, sin costuras que molesten y fácil de lavar.',
    meta: 'Algodón suave · 0–12 meses · 2 piezas',
    price: 950,
    stock: 'ok',
    img: '/assets/conjunto-bebe.jpg',
    alt: 'Conjunto de bebé color crema doblado sobre una tela de lino',
    keys: ['bebe', 'conjunto', 'nube', 'conjunto de bebe'],
  },
]

export const STOCK_TEXT = {
  ok: 'Disponible',
  low: 'Pocas unidades',
  order: 'Se cose por encargo',
}

export function categoryName(id) {
  const c = CATEGORIES.find((x) => x.id === id)
  return c ? c.name : id
}

export function productById(id) {
  return PRODUCTS.find((p) => p.id === id)
}
