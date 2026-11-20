import { STORE } from '../data/products'
import { waLink } from '../lib/helpers'
import { CheckIcon, WhatsAppIcon } from './icons'

// Portada: qué vende la tienda y los dos caminos para pedir.
export default function Hero() {
  const waGeneral = waLink('Hola, vi la tienda Hilos de Abuela y quiero hacer una consulta.')

  return (
    <div className="mx-auto max-w-6xl px-5 pt-11 pb-2.5">
      <div className="grid items-center gap-11 lg:grid-cols-[1.05fr_0.95fr] lg:gap-11">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-dashed border-rose bg-rose-soft px-3.5 py-1.5 text-[0.8rem] font-extrabold tracking-[0.08em] text-terra-dark uppercase">
            Hecho a mano en casa
          </span>
          <h1 className="mt-[18px] mb-1.5 font-serif text-[clamp(2.6rem,6vw,4.3rem)] leading-[1.12] font-semibold">
            Paños, muñecas y abanicos <em className="text-terra">cosidos con amor</em> de
            abuela
          </h1>
          <p className="my-3 max-w-[34rem] text-[1.13rem] text-ink-soft">
            Cada pieza sale de sus manos: paños de cocina y de baño bordados, muñecas de tela y
            abanicos para el calor. Sin intermediarios: pides por WhatsApp y pagas al recibir.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#catalogo"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-terra-dark bg-terra px-6 py-3 font-extrabold text-white no-underline hover:bg-terra-dark"
            >
              Ver el catálogo
            </a>
            <a
              href={waGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-wa-dark bg-wa px-6 py-3 font-extrabold text-white no-underline hover:bg-wa-dark"
            >
              <WhatsAppIcon />
              Pedir por WhatsApp
            </a>
          </div>
          <div className="mt-[26px] flex flex-wrap gap-x-[22px] gap-y-2 text-[0.93rem] font-bold text-ink-soft">
            <span className="inline-flex items-center gap-[7px]">
              <span className="text-sage">
                <CheckIcon />
              </span>
              Pago contra entrega
            </span>
            <span className="inline-flex items-center gap-[7px]">
              <span className="text-sage">
                <CheckIcon />
              </span>
              También por Transfermóvil
            </span>
            <span className="inline-flex items-center gap-[7px]">
              <span className="text-sage">
                <CheckIcon />
              </span>
              Encargos a tu medida
            </span>
          </div>
        </div>

        <figure className="relative m-0">
          <svg className="seal-spin absolute -top-6 -right-3.5 z-[2] h-[118px] w-[118px] drop-shadow-lg" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="57" fill="#b0512a" />
            <circle cx="60" cy="60" r="46" fill="none" stroke="#fdf6e9" strokeWidth="1.6" strokeDasharray="4 4" />
            <defs>
              <path id="sealArc" d="M60 14a46 46 0 1 1 0 92 46 46 0 1 1 0-92" />
            </defs>
            <text fill="#fdf6e9" fontSize="11.5" fontWeight="700" letterSpacing="2.5">
              <textPath href="#sealArc">HECHO A MANO · HILOS DE ABUELA · </textPath>
            </text>
            <path
              d="M60 78s-14.5-9.5-19.3-18C38.4 55.7 41 49.8 47 49.8c3.9 0 6.6 2.1 8.3 4.7h9.4c1.7-2.6 4.4-4.7 8.3-4.7 6 0 8.6 5.9 6.3 10.2C74.5 68.5 60 78 60 78Z"
              fill="#fdf6e9"
              transform="scale(.62) translate(37,26)"
            />
          </svg>
          <div className="rotate-[1.2deg] rounded-[10px] border-2 border-dashed border-stitch bg-surface p-3 shadow-[0_10px_30px_rgba(84,54,32,0.13)]">
            <img
              src="/assets/hero-bordado.jpg"
              alt="Manos bordando flores en un bastidor de madera, con madejas de hilo al lado"
              className="h-[300px] w-full rounded-[5px] object-cover lg:h-[440px]"
            />
            <figcaption className="px-1.5 pt-2.5 pb-1 text-center font-serif text-[1.15rem] text-ink-soft italic">
              «Cada puntada lleva su tiempo, y se nota.»
            </figcaption>
          </div>
        </figure>
      </div>
    </div>
  )
}
