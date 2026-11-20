import { useState } from 'react'
import { CATEGORIES, PRODUCTS, STOCK_TEXT, categoryName } from '../data/products'
import { fmt, waLink } from '../lib/helpers'

const STOCK_BADGE = {
  ok: 'border-sage bg-sage-soft text-sage dark:border-night-sage dark:bg-night-sage-soft dark:text-night-sage',
  low: 'border-rose bg-rose-soft text-[#a34d5c] dark:border-night-rose dark:bg-night-rose-soft dark:text-night-rose',
  order: 'border-terra bg-terra-soft text-terra-dark dark:border-terra-light dark:bg-night-terra-soft dark:text-terra-light',
}

// Tarjeta de un producto: foto, descripción, precio y cantidad para añadir.
function ProductCard({ product, onAdd }) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    onAdd(product.id, qty)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-[18px] border border-line bg-surface shadow-[0_3px_10px_rgba(84,54,32,0.10)] dark:border-night-line dark:bg-night-surface">
      <div className="relative">
        <img src={product.img} alt={product.alt} className="h-[230px] w-full object-cover" loading="lazy" />
        <span
          className={`absolute top-3 left-3 rounded-full border-[1.5px] border-dashed px-2.5 py-1 text-[0.74rem] font-extrabold tracking-[0.03em] ${STOCK_BADGE[product.stock]}`}
        >
          {STOCK_TEXT[product.stock]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-[7px] px-[18px] pt-4 pb-[18px]">
        <span className="text-[0.72rem] font-extrabold tracking-[0.14em] text-muted uppercase dark:text-night-muted">
          {categoryName(product.cat)}
        </span>
        <h3 className="font-serif text-[1.45rem] leading-[1.12] font-semibold">{product.name}</h3>
        <p className="m-0 text-[0.93rem] text-ink-soft dark:text-night-soft">{product.desc}</p>
        <p className="text-[0.85rem] font-semibold text-muted dark:text-night-muted">{product.meta}</p>
        <div className="mt-auto flex items-center justify-between gap-2.5 border-t-2 border-dashed border-line pt-2.5 dark:border-night-line">
          <span className="font-serif text-[1.6rem] leading-none font-bold text-terra-dark dark:text-terra-light">
            {fmt(product.price).replace(' CUP', '')}{' '}
            <small className="font-sans text-[0.85rem] font-bold text-muted dark:text-night-muted">CUP</small>
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-flex items-center overflow-hidden rounded-full border-2 border-line bg-surface dark:border-night-line dark:bg-night-surface">
              <button
                type="button"
                aria-label="Quitar uno"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-10 w-[38px] place-items-center text-[1.15rem] font-extrabold text-terra-dark hover:bg-surface-2 dark:text-terra-light dark:hover:bg-night-surface-2"
              >
                −
              </button>
              <output className="min-w-[26px] text-center font-extrabold">{qty}</output>
              <button
                type="button"
                aria-label="Añadir uno"
                onClick={() => setQty((q) => Math.min(20, q + 1))}
                className="grid h-10 w-[38px] place-items-center text-[1.15rem] font-extrabold text-terra-dark hover:bg-surface-2 dark:text-terra-light dark:hover:bg-night-surface-2"
              >
                +
              </button>
            </span>
            <button
              type="button"
              onClick={handleAdd}
              className={`inline-flex min-h-11 items-center gap-[7px] rounded-full border-2 px-4 py-2 font-extrabold text-white ${
                added ? 'border-sage bg-sage' : 'border-terra-dark bg-terra hover:bg-terra-dark'
              }`}
            >
              {added ? '✓ Añadido' : 'Añadir'}
            </button>
          </span>
        </div>
      </div>
    </article>
  )
}

// Categorías + filtros + rejilla del catálogo.
export default function Catalog({ onAdd }) {
  const [filter, setFilter] = useState('all')

  const filters = [{ id: 'all', name: 'Todo' }, ...CATEGORIES.map((c) => ({ id: c.id, name: c.name }))]
  const visible = PRODUCTS.filter((p) => filter === 'all' || p.cat === filter)

  const goToCategory = (id) => {
    setFilter(id)
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Categorías */}
      <section className="mx-auto max-w-6xl px-5 pt-[52px] pb-2" aria-labelledby="catTitle">
        <div className="mb-[26px] max-w-[640px]">
          <div className="mb-3.5 flex items-center gap-2.5 text-terra">
            <span className="h-0.5 flex-1 border-t-2 border-dashed border-stitch" />
          </div>
          <h2 id="catTitle" className="font-serif text-[clamp(1.9rem,4vw,2.6rem)] leading-[1.12] font-semibold">
            El rincón de <em className="text-terra dark:text-terra-light">la costura</em>
          </h2>
          <p className="mt-2.5 text-[1.02rem] text-ink-soft dark:text-night-soft">
            Seis rincones, un solo par de manos. Toca una categoría para ver solo esas piezas.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const n = PRODUCTS.filter((p) => p.cat === c.id).length
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => goToCategory(c.id)}
                aria-label={`Ver la categoría ${c.name}`}
                className="group relative min-h-[150px] cursor-pointer overflow-hidden rounded-[18px] bg-surface p-0 text-left shadow-[0_3px_10px_rgba(84,54,32,0.10)] dark:bg-night-surface"
              >
                <img
                  src={c.img}
                  alt={c.alt}
                  className="h-[170px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 right-3 rounded-full bg-[rgba(60,42,32,0.82)] px-2.5 py-1 text-[0.75rem] font-extrabold text-[#fdf6e9]">
                  {n} piezas
                </span>
                <span className="absolute bottom-3 left-3 rounded-full border-2 border-dashed border-stitch bg-surface px-4 py-1.5 font-serif text-[1.25rem] font-bold text-ink dark:border-night-stitch dark:bg-night-surface dark:text-night-cream">
                  {c.name}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Catálogo */}
      <section className="mx-auto max-w-6xl px-5 pt-[52px] pb-2" id="catalogo" aria-labelledby="shopTitle">
        <div className="mb-[26px] max-w-[640px]">
          <div className="mb-3.5 flex items-center gap-2.5 text-terra">
            <span className="h-0.5 flex-1 border-t-2 border-dashed border-stitch" />
          </div>
          <h2 id="shopTitle" className="font-serif text-[clamp(1.9rem,4vw,2.6rem)] leading-[1.12] font-semibold">
            Catálogo de <em className="text-terra dark:text-terra-light">la tienda</em>
          </h2>
          <p className="mt-2.5 text-[1.02rem] text-ink-soft dark:text-night-soft">
            Elige cantidad y añade al carrito. Al final, el pedido sale escrito y listo por WhatsApp: la
            abuela solo tiene que confirmarlo.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`min-h-11 rounded-full border-2 px-[18px] py-2 font-extrabold text-[0.92rem] ${
                filter === f.id
                  ? 'border-terra-dark bg-terra text-white'
                  : 'border-line bg-surface text-ink-soft hover:border-stitch dark:border-night-line dark:bg-night-surface dark:text-night-soft dark:hover:border-night-stitch'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.length === 0 && (
            <div className="col-span-full rounded-[18px] border-2 border-dashed border-stitch bg-surface px-6 py-10 text-center dark:border-night-stitch dark:bg-night-surface">
              {filter === 'modulos' ? (
                <>
                  <p className="m-0 font-serif text-[1.5rem] font-bold">Módulos, próximamente</p>
                  <p className="mx-auto mt-2 max-w-[430px] text-ink-soft dark:text-night-soft">
                    Todavía no hay piezas en esta categoría: se cosen por encargo, a tu medida y con
                    la tela que elijas.
                  </p>
                  <a
                    href={waLink(
                      'Hola, quiero pedir un módulo por encargo en Hilos de Abuela. Mi idea es: ',
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-wa-dark bg-wa px-6 py-3 font-extrabold text-white no-underline hover:bg-wa-dark"
                  >
                    Pregúntanos por WhatsApp
                  </a>
                </>
              ) : (
                <p className="m-0 font-bold text-muted dark:text-night-muted">
                  No hay piezas en esta categoría por ahora.
                </p>
              )}
            </div>
          )}
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          ))}
        </div>
      </section>
    </>
  )
}
