import { useCallback, useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Catalog from './components/Catalog'
import InfoSections from './components/InfoSections'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import HilitoChat from './components/HilitoChat'
import FloatingButtons from './components/FloatingButtons'
import { productById } from './data/products'

// Estado de la tienda: el carrito es un objeto { idProducto: cantidad }.
// No hay cuentas ni base de datos: el pedido sale por WhatsApp.
export default function App() {
  const [cart, setCart] = useState({})
  const [cartOpen, setCartOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)

  // Tema oscuro: el script de index.html ya puso la clase .dark antes de que
  // cargue React (lo guardado en localStorage, o el sistema si no hay nada).
  const [dark, setDark] = useState(
    () =>
      typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark'),
  )
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      window.localStorage.setItem('hilos-theme', dark ? 'dark' : 'light')
    } catch {
      // Sin localStorage, el tema solo vive en esta sesión.
    }
  }, [dark])

  const showToast = useCallback((msg) => {
    setToast(msg)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(''), 2200)
  }, [])

  const addToCart = useCallback(
    (id, qty) => {
      setCart((c) => ({ ...c, [id]: Math.min(20, (c[id] || 0) + qty) }))
      showToast(`${productById(id).name} añadido al carrito`)
    },
    [showToast],
  )

  const changeQty = useCallback((id, qty) => {
    setCart((c) => {
      if (qty <= 0) {
        const { [id]: _removed, ...rest } = c
        return rest
      }
      return { ...c, [id]: qty }
    })
  }, [])

  const removeItem = useCallback((id) => {
    setCart((c) => {
      const { [id]: _removed, ...rest } = c
      return rest
    })
  }, [])

  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0)

  // Escape cierra el carrito y el chat.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setCartOpen(false)
        setChatOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div id="inicio" className="relative z-[1]">
      <Header
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        dark={dark}
        onToggleTheme={() => setDark((d) => !d)}
      />

      <main>
        <Hero />
        <Catalog onAdd={addToCart} />
        <InfoSections />
      </main>

      <Footer />

      <FloatingButtons onOpenChat={() => setChatOpen(true)} />

      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onChangeQty={changeQty}
        onRemove={removeItem}
      />

      <HilitoChat open={chatOpen} onClose={() => setChatOpen(false)} cart={cart} onAddToCart={addToCart} />

      <div
        role="status"
        className={`fixed bottom-24 left-1/2 z-120 max-w-[calc(100vw-32px)] -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-center text-[0.92rem] font-extrabold text-cream shadow-[0_10px_30px_rgba(84,54,32,0.13)] transition-all duration-200 ${
          toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-5 opacity-0'
        }`}
      >
        {toast}
      </div>
    </div>
  )
}
