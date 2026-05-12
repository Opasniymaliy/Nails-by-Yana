import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import sertifikat1 from "@/assets/sertifikat-1.jpg";
import sertifikat2 from "@/assets/sertifikat-2.jpg";
import sertifikat3 from "@/assets/sertifikat-3.jpg";
import sertifikat4 from "@/assets/sertifikat-4.jpg";
import sertifikat5 from "@/assets/sertifikat-5.jpg";
import sertifikat6 from "@/assets/sertifikat-6.jpg";
import sertifikat7 from "@/assets/sertifikat-7.jpg";
import sertifikat8 from "@/assets/sertifikat-8.jpg";

// новые фото 9–16
import sertifikat9 from "@/assets/sertifikat-9.jpg";
import sertifikat10 from "@/assets/sertifikat-10.jpg";
import sertifikat11 from "@/assets/sertifikat-11.jpg";
import sertifikat12 from "@/assets/sertifikat-12.jpg";
import sertifikat13 from "@/assets/sertifikat-13.jpg";
import sertifikat14 from "@/assets/sertifikat-14.jpg";
import sertifikat15 from "@/assets/sertifikat-15.jpg";
import sertifikat16 from "@/assets/sertifikat-16.jpg";
import sertifikat17 from "@/assets/sertifikat-17.jpg";
import sertifikat18 from "@/assets/sertifikat-18.jpg";
import sertifikat19 from "@/assets/sertifikat-19.jpg";
import sertifikat20 from "@/assets/sertifikat-20.jpg";


type Cert = { name: string; image: string };

const base8: Cert[] = [
  { name: "Маникюра EMI", image: sertifikat1 },
  { name: "Марафон", image: sertifikat2 },
  { name: "NAIL", image: sertifikat3 },
  { name: "EMI WORLD", image: sertifikat4 },
  { name: "EMI Сертификат", image: sertifikat5 },
  { name: "Мастер-класс", image: sertifikat6 },
  { name: "Нормы СанПиН", image: sertifikat7 },
  { name: "Обучающий эфир", image: sertifikat8 },
];

const certificates: Cert[] = [
  ...base8,
  { name: "Моделирование авангардных форм", image: sertifikat9 },
  { name: "Гель-лак GelLaxy", image: sertifikat10 },
  { name: "Художественная лепка", image: sertifikat11 },
  { name: "Френч-моделирование, удлинение ложа ", image: sertifikat12 },
  { name: "Френч-моделирование, удлинение ложа", image: sertifikat13 },
  { name: "Диплом Blaze Nails", image: sertifikat14 },
  { name: "Китайская роспись ", image: sertifikat15 },
  { name: "Modern Salon Nail Modeling", image: sertifikat16 },
  { name: "Актуальные техники современного педикюра", image: sertifikat17 },
  { name: "Японский маникюр восходящий тренд 2025г", image: sertifikat18 },
  { name: "Готический миндаль. Арочный квадрат", image: sertifikat19 },
  { name: "Emi world 3 место", image: sertifikat20 },
];

const FIRST_BATCH = 8;

/* Иконки-стрелки */
const ArrowDown: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className}><path d="M12 16 6 10h12l-6 6z" fill="currentColor"/></svg>
);
const ArrowUp: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className}><path d="M12 8 18 14H6l6-6z" fill="currentColor"/></svg>
);

const CertificatesSection: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // измеряем высоту скрытого блока
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxH, setMaxH] = useState(0);

  const recalc = useCallback(() => {
    if (contentRef.current) setMaxH(contentRef.current.scrollHeight);
  }, []);

  useEffect(() => {
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [recalc]);

  useEffect(() => {
    // если свернули, а открыт >8 — переносим на 8-й
    if (!expanded && lightboxIdx !== null && lightboxIdx >= FIRST_BATCH) {
      setLightboxIdx(FIRST_BATCH - 1);
    }
    requestAnimationFrame(recalc);
  }, [expanded, lightboxIdx, recalc]);

  const visibleCount = useMemo(
    () => (expanded ? certificates.length : Math.min(FIRST_BATCH, certificates.length)),
    [expanded]
  );

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const next = () =>
    setLightboxIdx((i) => {
      if (i === null) return i;
      const cap = visibleCount;
      return ((i % cap) + 1) % cap;
    });
  const prev = () =>
    setLightboxIdx((i) => {
      if (i === null) return i;
      const cap = visibleCount;
      return (i - 1 + cap) % cap;
    });

  const Card: React.FC<{ cert: Cert; idx: number }> = ({ cert, idx }) => (
    <article
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-background/40 shadow-[0_20px_60px_rgba(15,15,15,0.45)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_80px_rgba(15,15,15,0.55)] cursor-zoom-in"
      onClick={() => openLightbox(idx)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={cert.image}
          alt={cert.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onLoad={recalc}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5">
          <h3 className="mt-1 font-semibold text-sm uppercase tracking-[0.3em] text-foreground">
            {cert.name}
          </h3>
        </div>
      </div>
    </article>
  );

  return (
    <section id="certificates" className="scroll-mt-20 py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] xl:grid-cols-[minmax(0,1fr)_minmax(360px,500px)] lg:items-start lg:gap-x-24 xl:gap-x-28">
          {/* Левая колонка */}
          <div className="space-y-8">
            {/* первые 8 */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:gap-8">
              {certificates.slice(0, FIRST_BATCH).map((c, i) => (
                <Card key={`c1-${i}`} cert={c} idx={i} />
              ))}
            </div>

            {/* верхняя кнопка — не занимает места при expanded */}
            <div
              className={
                "relative flex justify-center overflow-hidden transition-[height] duration-300 " +
                (expanded ? "h-0" : "h-14")
              }
            >
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className={
                  "group absolute inline-flex h-14 w-14 items-center justify-center rounded-[18px] " +
                  "border border-white/15 bg-black/20 text-muted-foreground transition-all " +
                  "duration-300 ease-out hover:border-primary/60 hover:text-primary focus:outline-none " +
                  (expanded
                    ? "opacity-0 scale-95 pointer-events-none"
                    : "opacity-100 scale-100 pointer-events-auto")
                }
                aria-expanded={expanded}
                aria-label="Показать дополнительные сертификаты"
              >
                <ArrowDown className="h-6 w-6" />
              </button>
            </div>

            {/* раскрывающийся блок */}
            <div
              style={{ maxHeight: expanded ? maxH : 0 }}
              className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
            >
              <div
                ref={contentRef}
                className={
                  expanded
                    ? "opacity-100 transition-opacity duration-300"
                    : "opacity-0 transition-opacity duration-200"
                }
              >
                <div className={`grid grid-cols-2 gap-6 ${expanded ? "pt-4" : "pt-6"} sm:grid-cols-3 lg:grid-cols-4 xl:gap-8`}>
                  {certificates.slice(FIRST_BATCH).map((c, i) => (
                    <Card key={`c2-${i}`} cert={c} idx={FIRST_BATCH + i} />
                  ))}
                </div>

                {/* нижняя кнопка — плавно исчезает при сворачивании */}
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setExpanded(false)}
                    className={
                      "group inline-flex h-14 w-14 items-center justify-center rounded-[18px] " +
                      "border border-white/15 bg-black/20 text-muted-foreground transition-all duration-300 " +
                      "hover:border-primary/60 hover:text-primary focus:outline-none " +
                      (expanded ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none")
                    }
                    aria-expanded={expanded}
                    aria-label="Свернуть дополнительные сертификаты"
                  >
                    <ArrowUp className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка */}
          <div className="flex flex-col items-center gap-8 text-center lg:items-end lg:text-right lg:self-start lg:max-w-[440px] xl:max-w-[500px]">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.45em] text-muted-foreground/90">
                <span className="h-2 w-2 rounded-full bg-primary" />
                достижения
              </span>
              <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.14em] text-[#FF62B1] lg:text-[2.75rem] xl:text-[3rem] xl:tracking-[0.18em]">
                СЕРТИФИКАТЫ
              </h2>
            </div>
            <p className="max-w-sm text-sm font-medium leading-relaxed tracking-[0.2em] text-muted-foreground uppercase lg:max-w-none lg:text-base xl:tracking-[0.22em]">
              <span className="text-foreground">Я горжусь каждым из этих сертификатов</span>
              {" — они напоминают о пути, который я прошла, чтобы "}
              <span className="text-primary">давать вам только лучшее.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Лайтбокс */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <figure
            className="relative max-w-[96vw] max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={certificates[lightboxIdx].image}
              alt={certificates[lightboxIdx].name}
              className="max-w-[96vw] max-h-[92vh] object-contain rounded-[16px] shadow-2xl"
            />
            <figcaption className="mt-3 text-center text-xs uppercase tracking-[0.35em] text-white/80">
              {certificates[lightboxIdx].name}
            </figcaption>

            <button
              onClick={closeLightbox}
              className="absolute -top-3 -right-3 rounded-full bg-black/70 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white hover:bg-black/85"
            >
              закрыть
            </button>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-white/90 hover:bg-black/75"
              aria-label="Предыдущий"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-white/90 hover:bg-black/75"
              aria-label="Следующий"
            >
              ›
            </button>
          </figure>
        </div>
      )}
    </section>
  );
};

export default CertificatesSection;
