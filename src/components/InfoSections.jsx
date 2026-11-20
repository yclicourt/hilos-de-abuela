import { waLink } from '../lib/helpers'

// Historia de la abuela, cómo comprar, encargos a medida y preguntas.
// Todo el texto es de ejemplo y se ajusta con los datos reales.
export default function InfoSections() {
  return (
    <>
      {/* Historia */}
      <section className="mx-auto max-w-6xl px-5 pt-[52px] pb-2" id="historia" aria-labelledby="storyTitle">
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <figure className="m-0 -rotate-[1.4deg] rounded-[10px] border-2 border-dashed border-stitch bg-surface p-3 shadow-[0_10px_30px_rgba(84,54,32,0.13)] dark:border-night-stitch dark:bg-night-surface">
            <img
              src="/assets/historia-costurera.jpg"
              alt="La abuela cosiendo concentrada en su máquina, en su rincón de costura en casa"
              className="h-[280px] w-full rounded-[5px] object-cover lg:h-[360px]"
              loading="lazy"
            />
            <figcaption className="px-1.5 pt-2.5 pb-1 text-center font-serif text-[1.15rem] text-ink-soft italic dark:text-night-soft">
              Su rincón de siempre, junto a la ventana.
            </figcaption>
          </figure>
          <div>
            <h2 id="storyTitle" className="mb-3.5 font-serif text-[clamp(1.9rem,4vw,2.6rem)] leading-[1.12] font-semibold">
              Detrás de cada pieza hay <em className="text-terra dark:text-terra-light">un par de manos y mucho oficio</em>
            </h2>
            <p className="mb-3.5 text-ink-soft dark:text-night-soft">
              Coser es lo suyo desde siempre: remienda, ajusta, borda y convierte cada retazo en algo
              útil y bonito para tu casa. Si está en esta tienda, pasó antes por sus manos.
            </p>
            <p className="mb-3.5 text-ink-soft dark:text-night-soft">
              Trabaja en su rincón de siempre, con su máquina, sus tijeras de toda la vida y una caja de
              hilos de mil colores. Nada sale de ahí sin que ella lo revise puntada a puntada.
            </p>
            <p className="mt-1.5 font-serif text-[1.5rem] text-terra-dark italic dark:text-terra-light">— La abuela costurera</p>
            <div className="mt-5 flex flex-wrap gap-[26px]">
              <div>
                <b className="block font-serif text-[1.9rem] leading-none">4</b>
                <span className="text-[0.82rem] font-bold tracking-[0.05em] text-muted uppercase dark:text-night-muted">
                  rincones de costura
                </span>
              </div>
              <div>
                <b className="block font-serif text-[1.9rem] leading-none">1 a 1</b>
                <span className="text-[0.82rem] font-bold tracking-[0.05em] text-muted uppercase dark:text-night-muted">
                  cada pieza, única
                </span>
              </div>
              <div>
                <b className="block font-serif text-[1.9rem] leading-none">0</b>
                <span className="text-[0.82rem] font-bold tracking-[0.05em] text-muted uppercase dark:text-night-muted">
                  piezas en serie
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo comprar */}
      <section className="mx-auto max-w-6xl px-5 pt-[52px] pb-2" id="como-comprar" aria-labelledby="stepsTitle">
        <div className="mb-[26px] max-w-[640px]">
          <div className="mb-3.5 flex items-center gap-2.5 text-terra">
            <span className="h-0.5 flex-1 border-t-2 border-dashed border-stitch" />
          </div>
          <h2 id="stepsTitle" className="font-serif text-[clamp(1.9rem,4vw,2.6rem)] leading-[1.12] font-semibold">
            Comprar es <em className="text-terra dark:text-terra-light">así de fácil</em>
          </h2>
        </div>
        <div className="grid gap-[18px] lg:grid-cols-3">
          {[
            {
              n: '1',
              t: 'Elige tus piezas',
              d: 'Recorre el catálogo, ajusta las cantidades y añade al carrito lo que te guste. Si tienes dudas, pregúntale a Hilito, el asistente de la tienda.',
            },
            {
              n: '2',
              t: 'Envía el pedido por WhatsApp',
              d: 'Con un toque, el pedido sale escrito con productos, cantidades y total. La abuela lo recibe y te confirma disponibilidad y entrega.',
            },
            {
              n: '3',
              t: 'Recibe y paga en casa',
              d: 'Pagas al recibir, en efectivo o por Transfermóvil. Sin registros, sin tarjetas y sin vueltas.',
            },
          ].map((s) => (
            <article key={s.n} className="rounded-[18px] border border-line bg-surface p-6 dark:border-night-line dark:bg-night-surface">
              <div className="mb-3.5 grid h-[52px] w-[52px] place-items-center rounded-full border-2 border-dashed border-terra bg-surface-2 font-serif text-[1.7rem] font-bold text-terra-dark dark:bg-night-surface-2 dark:text-terra-light">
                {s.n}
              </div>
              <h3 className="mb-[7px] font-serif text-[1.4rem] font-semibold">{s.t}</h3>
              <p className="m-0 text-[0.96rem] text-ink-soft dark:text-night-soft">{s.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Encargos */}
      <section className="mx-auto max-w-6xl px-5 pt-[52px] pb-2" aria-labelledby="customTitle">
        <div className="grid items-center gap-6 rounded-[18px] border-2 border-dashed border-sage bg-sage-soft p-[30px] lg:grid-cols-[1.2fr_0.8fr] dark:border-night-sage dark:bg-night-sage-soft">
          <div>
            <h2 id="customTitle" className="font-serif text-[clamp(1.8rem,3.5vw,2.4rem)] leading-[1.12] font-semibold">
              ¿Lo quieres <em className="text-terra dark:text-terra-light">a tu medida</em>?
            </h2>
            <p className="mt-2.5 mb-0 text-ink-soft dark:text-night-soft">
              Una muñeca con el vestido de otro color, un juego de paños con tus iniciales bordadas, un
              abanico que combine con tu traje… Escríbenos por WhatsApp y la abuela lo cose por encargo.
            </p>
          </div>
          <a
            href={waLink('Hola, quiero pedir un encargo a medida en Hilos de Abuela. Mi idea es: ')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-terra-dark bg-terra px-6 py-3 font-extrabold text-white no-underline hover:bg-terra-dark lg:justify-self-start"
          >
            Pedir un encargo por WhatsApp
          </a>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="mx-auto max-w-6xl px-5 pt-[52px] pb-2" id="preguntas" aria-labelledby="faqTitle">
        <div className="mb-[26px] max-w-[640px]">
          <div className="mb-3.5 flex items-center gap-2.5 text-terra">
            <span className="h-0.5 flex-1 border-t-2 border-dashed border-stitch" />
          </div>
          <h2 id="faqTitle" className="font-serif text-[clamp(1.9rem,4vw,2.6rem)] leading-[1.12] font-semibold">
            Preguntas <em className="text-terra dark:text-terra-light">frecuentes</em>
          </h2>
        </div>
        <div className="max-w-[760px]">
          {[
            {
              q: '¿Cómo pago mi pedido?',
              a: 'Pagas al recibir: en efectivo o por Transfermóvil, como prefieras. No pedimos pagos por adelantado en los productos del catálogo; en los encargos a medida se acuerda una pequeña seña por WhatsApp.',
            },
            {
              q: '¿Hacen entregas a domicilio?',
              a: 'La entrega se coordina por WhatsApp al confirmar el pedido: punto de encuentro o mensajería según tu zona. Ahí mismo te decimos si tiene costo adicional antes de cerrar el pedido.',
            },
            {
              q: '¿Aceptan encargos personalizados?',
              a: 'Sí, es de lo que más le gusta hacer. Colores, medidas, iniciales bordadas o una muñeca parecida a alguien: cuéntanos la idea por WhatsApp y te decimos precio y tiempo de costura.',
            },
            {
              q: '¿Cuánto tarda un encargo?',
              a: 'Depende de la pieza y de la cola de encargos, pero lo habitual es entre 3 y 7 días. Todo se cose a mano y sin prisa, para que quede bien.',
            },
            {
              q: '¿Y si una pieza llega con un defecto?',
              a: 'Escríbenos por WhatsApp con una foto y lo resolvemos: se repara, se cambia o se devuelve el dinero. La abuela responde por cada puntada que sale de su casa.',
            },
          ].map((f) => (
            <details key={f.q} className="mb-2.5 overflow-hidden rounded-[14px] border border-line bg-surface dark:border-night-line dark:bg-night-surface">
              <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-extrabold">
                {f.q}
                <svg className="shrink-0 text-terra" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <p className="m-0 px-5 pb-[18px] text-ink-soft dark:text-night-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
