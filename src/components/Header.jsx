import { STORE } from '../data/products'
import { CartIcon, NeedleIcon } from './icons'

// Barra superior fija: marca, navegación y botón del carrito.
export default function Header({ cartCount, onOpenCart }) {
  return (
    <header className="sticky top-0 z-60 border-b-2 border-dashed border-stitch bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3.5 px-5 py-2.5">
        <a href="#inicio" className="flex min-h-11 items-center gap-2.5 text-ink no-underline">
          <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full border-2 border-dashed border-terra bg-surface">
            <NeedleIcon />
          </span>
          <span>
            <span className="block font-serif text-[1.55rem] leading-none font-bold">{STORE.name}</span>
            <span className="text-[0.68rem] font-bold tracking-[0.16em] text-muted uppercase">
              {STORE.tagline}
            </span>
          </span>
        </a>

        <nav className="ml-auto hidden gap-1 md:flex" aria-label="Secciones">
          <a href="#catalogo" className="inline-flex min-h-11 items-center rounded-full px-3 py-2.5 text-[0.92rem] font-bold text-ink-soft no-underline hover:bg-surface-2 hover:text-ink">
            Catálogo
          </a>
          <a href="#historia" className="inline-flex min-h-11 items-center rounded-full px-3 py-2.5 text-[0.92rem] font-bold text-ink-soft no-underline hover:bg-surface-2 hover:text-ink">
            La abuela
          </a>
          <a href="#como-comprar" className="inline-flex min-h-11 items-center rounded-full px-3 py-2.5 text-[0.92rem] font-bold text-ink-soft no-underline hover:bg-surface-2 hover:text-ink">
            Cómo comprar
          </a>
          <a href="#preguntas" className="inline-flex min-h-11 items-center rounded-full px-3 py-2.5 text-[0.92rem] font-bold text-ink-soft no-underline hover:bg-surface-2 hover:text-ink">
            Preguntas
          </a>
        </nav>

        <button
          type="button"
          onClick={onOpenCart}
          aria-label="Abrir el carrito"
          className="relative ml-auto inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-ink bg-surface px-4 py-2 font-extrabold text-ink hover:bg-surface-2 md:ml-2"
        >
          <CartIcon />
          Carrito
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-1.5 grid h-[22px] min-w-[22px] place-items-center rounded-full border-2 border-cream bg-terra px-1 text-[0.72rem] font-extrabold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
