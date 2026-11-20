import { STORE } from '../data/products'

// Pie de página: la tienda, pago y entrega. La zona de entrega es un
// placeholder hasta que la abuela confirme la suya.
export default function Footer() {
  return (
    <footer className="mt-[60px] border-t-2 border-dashed border-stitch bg-cream-soft pt-9 pb-[110px]">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-7 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <h3 className="mb-2.5 font-serif text-[1.35rem] font-bold">{STORE.name}</h3>
            <p className="text-[0.94rem] text-ink-soft">
              Costura artesanal hecha en casa: paños de cocina y de baño, muñecos de tela y abanicos.
              Cada pieza es única, como las manos que la cosen.
            </p>
          </div>
          <div>
            <h3 className="mb-2.5 font-serif text-[1.35rem] font-bold">La tienda</h3>
            <ul className="grid list-none gap-[7px] p-0">
              <li>
                <a href="#catalogo" className="text-[0.94rem] font-bold text-ink-soft no-underline hover:text-terra">
                  Catálogo completo
                </a>
              </li>
              <li>
                <a href="#como-comprar" className="text-[0.94rem] font-bold text-ink-soft no-underline hover:text-terra">
                  Cómo comprar
                </a>
              </li>
              <li>
                <a href="#preguntas" className="text-[0.94rem] font-bold text-ink-soft no-underline hover:text-terra">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a href="#historia" className="text-[0.94rem] font-bold text-ink-soft no-underline hover:text-terra">
                  Conoce a la abuela
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2.5 font-serif text-[1.35rem] font-bold">Pedidos</h3>
            <ul className="grid list-none gap-[7px] p-0 text-[0.94rem] text-ink-soft">
              <li>WhatsApp: pedidos y encargos</li>
              <li>Horario: {STORE.hours}</li>
              <li>Pago: contra entrega o Transfermóvil</li>
              <li>Entrega: {STORE.deliveryZone}</li>
              <li>Precios en CUP</li>
            </ul>
          </div>
        </div>
        <div className="mt-[26px] flex flex-wrap justify-between gap-x-[18px] gap-y-1.5 border-t-2 border-dashed border-stitch pt-[18px] text-[0.85rem] text-muted">
          <span>© 2026 {STORE.name} · Hecho a mano, puntada a puntada</span>
          <span>Productos, fotos, precios e historia de ejemplo; se sustituyen por los datos reales.</span>
        </div>
      </div>
    </footer>
  )
}
