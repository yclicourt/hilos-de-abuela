import { waLink } from '../lib/helpers'
import { ChatIcon, WhatsAppIcon } from './icons'

// Botones flotantes: abrir a Hilito y escribir por WhatsApp.
export default function FloatingButtons({ onOpenChat }) {
  const waGeneral = waLink('Hola, vi la tienda Hilos de Abuela y quiero hacer una consulta.')

  return (
    <div className="fixed right-4 bottom-4 z-80 flex flex-col items-end gap-3">
      <button
        type="button"
        onClick={onOpenChat}
        aria-label="Abrir el asistente de la tienda"
        className="inline-flex min-h-[52px] items-center gap-2 rounded-full border-2 border-dashed border-white/65 bg-terra px-5 py-3 text-[0.95rem] font-extrabold text-white shadow-[0_10px_30px_rgba(84,54,32,0.13)] outline-2 outline-terra hover:bg-terra-dark"
      >
        <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-[#b8f4cd]" aria-hidden="true" />
        <ChatIcon />
        <span className="hidden sm:inline">Pregúntale a Hilito</span>
      </button>
      <a
        href={waGeneral}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-wa px-5 py-3 text-[0.95rem] font-extrabold text-white no-underline shadow-[0_10px_30px_rgba(84,54,32,0.13)] hover:bg-wa-dark"
      >
        <WhatsAppIcon size={21} />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  )
}
