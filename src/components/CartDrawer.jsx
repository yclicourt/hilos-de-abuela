import { useState } from 'react'
import { PRODUCTS, productById } from '../data/products'
import { fmt, orderMessage, waLink } from '../lib/helpers'
import { CloseIcon, WhatsAppIcon } from './icons'

// Panel lateral del carrito: líneas, cantidades, nombre opcional y total.
// El pedido NO se guarda en ningún sitio: sale escrito por WhatsApp.
export default function CartDrawer({ open, cart, onClose, onChangeQty, onRemove }) {
  const [buyerName, setBuyerName] = useState('')
  const ids = Object.keys(cart)
  const totalQty = ids.reduce((s, id) => s + cart[id], 0)
  const total = ids.reduce((s, id) => s + productById(id).price * cart[id], 0)

  const checkout = () => {
    if (ids.length === 0) return
    const msg = orderMessage(cart, PRODUCTS, buyerName.trim())
    window.open(waLink(msg), '_blank', 'noopener')
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-90 bg-[rgba(46,30,20,0.5)] transition-opacity duration-200 ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        aria-label="Carrito de compras"
        aria-hidden={!open}
        className={`drawer-in fixed top-0 right-0 z-95 flex h-dvh w-[min(430px,100vw)] flex-col bg-cream shadow-[0_10px_30px_rgba(84,54,32,0.13)] ${
          open ? 'flex' : 'hidden'
        }`}
      >
        <div className="flex items-center justify-between gap-2.5 border-b-2 border-dashed border-stitch px-5 py-[18px]">
          <h2 className="font-serif text-[1.7rem] font-bold">Tu carrito</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar el carrito"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-line bg-surface text-ink hover:bg-surface-2"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {ids.length === 0 && (
            <div className="px-2.5 py-11 text-center font-bold text-muted">
              Tu carrito está vacío.
              <br />
              Date una vuelta por el catálogo y enamórate de algo.
            </div>
          )}
          {ids.map((id) => {
            const p = productById(id)
            return (
              <div key={id} className="flex gap-3 border-b-2 border-dashed border-line py-[13px]">
                <img src={p.img} alt="" className="h-16 w-16 shrink-0 rounded-[10px] object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="text-[0.95rem] leading-[1.3] font-extrabold">{p.name}</div>
                  <div className="text-[0.9rem] font-extrabold text-terra-dark">{fmt(p.price)} c/u</div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="inline-flex items-center overflow-hidden rounded-full border-2 border-line bg-surface">
                      <button
                        type="button"
                        aria-label="Quitar uno"
                        onClick={() => onChangeQty(id, cart[id] - 1)}
                        className="grid h-[34px] w-8 place-items-center text-[1.15rem] font-extrabold text-terra-dark hover:bg-surface-2"
                      >
                        −
                      </button>
                      <output className="min-w-[26px] text-center font-extrabold">{cart[id]}</output>
                      <button
                        type="button"
                        aria-label="Añadir uno"
                        onClick={() => onChangeQty(id, Math.min(20, cart[id] + 1))}
                        className="grid h-[34px] w-8 place-items-center text-[1.15rem] font-extrabold text-terra-dark hover:bg-surface-2"
                      >
                        +
                      </button>
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemove(id)}
                      className="min-h-9 bg-transparent px-2 py-2 text-[0.82rem] font-bold text-muted hover:text-terra"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {ids.length > 0 && (
          <div className="border-t-2 border-dashed border-stitch bg-surface px-5 pt-4 pb-5">
            <div className="mb-2.5">
              <label htmlFor="buyerName" className="mb-1 block text-[0.82rem] font-extrabold text-ink-soft">
                Tu nombre (opcional)
              </label>
              <input
                id="buyerName"
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                placeholder="Ej.: María"
                autoComplete="name"
                className="min-h-[46px] w-full rounded-xl border-2 border-line bg-cream px-3 py-2.5 font-[inherit] text-ink focus:border-terra focus:outline-none"
              />
            </div>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span>Total del pedido</span>
              <b className="font-serif text-[1.8rem] text-terra-dark">{fmt(total)}</b>
            </div>
            <p className="mt-0 mb-3 text-[0.83rem] text-muted">
              El envío se coordina por WhatsApp. Pagas al recibir, en efectivo o por Transfermóvil.
            </p>
            <button
              type="button"
              onClick={checkout}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-wa-dark bg-wa px-6 py-3 font-extrabold text-white hover:bg-wa-dark"
            >
              <WhatsAppIcon />
              Pedir por WhatsApp
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
