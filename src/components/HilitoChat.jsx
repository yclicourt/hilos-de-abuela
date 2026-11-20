import { useEffect, useRef, useState } from 'react'
import { answer, askAgent, SUGGESTIONS, waLinkFor } from '../lib/hilito'
import { fmt } from '../lib/helpers'
import { CloseIcon, NeedleIcon, SendIcon } from './icons'

// Ventana de Hilito. Primero intenta el agente real (Groq vía /api/hilito,
// askAgent en src/lib/hilito.js); si no hay clave o Groq falla, usa la
// respuesta simulada local (answer), con la misma forma de respuesta.
export default function HilitoChat({ open, onClose, cart, onAddToCart }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [started, setStarted] = useState(false)
  const bodyRef = useRef(null)

  // Saludo la primera vez que se abre.
  useEffect(() => {
    if (open && !started) {
      setStarted(true)
      pushBot({
        text: '¡Hola! Soy Hilito, el asistente de la tienda de la abuela.\nPregúntame por precios, materiales, medidas o disponibilidad, y si quieres te añado piezas al carrito.',
      })
    }
  }, [open, started])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [messages, typing])

  const pushBot = (reply) => {
    setTyping(true)
    window.setTimeout(() => {
      setTyping(false)
      setMessages((ms) => [...ms, { from: 'bot', ...reply }])
    }, 650)
  }

  const send = (text) => {
    const v = (text || '').trim()
    if (!v) return
    setMessages((ms) => [...ms, { from: 'user', text: v }])
    setInput('')
    // La respuesta se calcula SOLO con el catálogo: nunca inventa precios.
    // Primero el agente real (Groq); si no está disponible, la simulada.
    window.setTimeout(async () => {
      const reply = (await askAgent(v, cart)) || answer(v, cart)
      if (reply.addToCart && reply.product) onAddToCart(reply.product.id, 1)
      pushBot(reply)
    }, 250)
  }

  return (
    <section
      aria-label="Asistente de la tienda"
      className={`fixed right-4 bottom-4 z-96 flex h-[min(600px,calc(100dvh-110px))] w-[min(392px,calc(100vw-24px))] flex-col overflow-hidden rounded-[20px] border border-line bg-cream shadow-[0_24px_60px_rgba(46,30,20,0.35)] dark:border-night-line dark:bg-night ${
        open ? 'flex' : 'hidden'
      }`}
    >
      <div className="flex items-center gap-3 bg-terra px-4 py-3.5 text-white">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-dashed border-terra bg-white text-terra">
          <NeedleIcon />
        </span>
        <div>
          <h3 className="font-serif text-[1.3rem] leading-[1.1] font-bold">Hilito, el asistente</h3>
          <p className="m-0 text-[0.78rem] opacity-90">Responde solo con los datos del catálogo</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar el asistente"
          className="ml-auto grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/40 bg-white/15 text-white hover:bg-white/25"
        >
          <CloseIcon size={18} />
        </button>
      </div>

      <div ref={bodyRef} className="flex flex-1 flex-col gap-2.5 overflow-y-auto bg-cream-soft px-3.5 py-4 dark:bg-night-2">
        {messages.map((m, i) =>
          m.from === 'user' ? (
            <div
              key={i}
              className="max-w-[86%] self-end rounded-2xl rounded-br-[5px] bg-terra px-3.5 py-2.5 text-[0.94rem] leading-[1.5] whitespace-pre-wrap text-white"
            >
              {m.text}
            </div>
          ) : (
            <div
              key={i}
              className="max-w-[86%] self-start rounded-2xl rounded-bl-[5px] border border-line bg-surface px-3.5 py-2.5 text-[0.94rem] leading-[1.5] whitespace-pre-wrap shadow-[0_3px_10px_rgba(84,54,32,0.10)] dark:border-night-line dark:bg-night-surface"
            >
              {m.text}
              {m.product && (
                <span className="mt-2 flex items-center gap-2.5 rounded-xl border-[1.5px] border-dashed border-stitch bg-surface-2 p-2 dark:border-night-stitch dark:bg-night-surface-2">
                  <img src={m.product.img} alt="" className="h-[46px] w-[46px] rounded-lg object-cover" />
                  <span className="min-w-[110px] flex-1">
                    <span className="block text-[0.85rem] leading-[1.25] font-extrabold">{m.product.name}</span>
                    <span className="block text-[0.85rem] font-extrabold text-terra-dark dark:text-terra-light">
                      {fmt(m.product.price)}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onAddToCart(m.product.id, 1)}
                    className="min-h-[38px] shrink-0 rounded-full bg-terra px-3.5 py-2 text-[0.8rem] font-extrabold whitespace-nowrap text-white"
                  >
                    Añadir
                  </button>
                </span>
              )}
              {m.waText && (
                <a
                  href={waLinkFor(m.waText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-10 items-center gap-[7px] rounded-full bg-wa px-3.5 py-2 text-[0.85rem] font-extrabold text-white no-underline"
                >
                  Seguir por WhatsApp
                </a>
              )}
            </div>
          ),
        )}
        {typing && (
          <div className="inline-flex items-center gap-[5px] self-start rounded-2xl rounded-bl-[5px] border border-line bg-surface px-3.5 py-2.5 shadow-[0_3px_10px_rgba(84,54,32,0.10)] dark:border-night-line dark:bg-night-surface">
            <i className="typing-dot block h-[7px] w-[7px] rounded-full bg-muted dark:bg-night-muted" />
            <i className="typing-dot block h-[7px] w-[7px] rounded-full bg-muted dark:bg-night-muted" />
            <i className="typing-dot block h-[7px] w-[7px] rounded-full bg-muted dark:bg-night-muted" />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-[7px] bg-cream-soft px-3.5 pt-2.5 pb-1 dark:bg-night-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => send(s)}
            className="min-h-[38px] rounded-full border-[1.5px] border-dashed border-stitch bg-surface px-3 py-2 text-[0.82rem] font-bold text-ink-soft hover:border-terra hover:text-terra-dark dark:border-night-stitch dark:bg-night-surface dark:text-night-soft dark:hover:border-terra-light dark:hover:text-terra-light"
          >
            {s}
          </button>
        ))}
      </div>

      <form
        className="flex gap-2 border-t-2 border-dashed border-stitch bg-surface p-3 dark:border-night-stitch dark:bg-night-surface"
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Escribe tu pregunta…"
          autoComplete="off"
          aria-label="Escribe tu pregunta al asistente"
          className="min-h-[46px] min-w-0 flex-1 rounded-full border-2 border-line bg-cream px-4 py-2.5 font-[inherit] text-ink focus:border-terra focus:outline-none dark:border-night-line dark:bg-night-2 dark:text-night-cream"
        />
        <button
          type="submit"
          aria-label="Enviar mensaje"
          className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-terra text-white"
        >
          <SendIcon />
        </button>
      </form>
    </section>
  )
}
