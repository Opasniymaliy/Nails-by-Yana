"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

import video1 from "@/assets/video/portfolio/video1.mp4";
import video2 from "@/assets/video/portfolio/video2.mp4";
import video3 from "@/assets/video/portfolio/video3.mp4";
import video4 from "@/assets/video/portfolio/video4.mp4";
import video5 from "@/assets/video/portfolio/video5.mp4";
import video6 from "@/assets/video/portfolio/video6.mp4";

type PortfolioShot = { src: string; alt: string };
type PortfolioCategory = { key: string; title: string; shots: PortfolioShot[] };

// сортировка: сначала по числам в имени (1,2,10), иначе — алфавит
const byNumericName = (a: string, b: string) => {
  const isCover = (s: string) => s.toLowerCase().includes("cover");
  if (isCover(a) && !isCover(b)) return -1;
  if (!isCover(a) && isCover(b)) return 1;

  const num = (s: string) => {
    const m = s.match(/(\d+)/g);
    return m ? Number(m[m.length - 1]) : NaN;
  };
  const na = num(a);
  const nb = num(b);
  if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
};

// ВАЖНО: использовать ЛИТЕРАЛЬНЫЕ шаблоны и относительные пути от текущего файла
// ../../ потому что файл лежит в src/components, а картинки в src/assets
const blok1Modules = import.meta.glob(
  "../assets/portfolio/blok1/*.{jpg,jpeg,png,webp,avif}",
  { eager: true }
);
const blok2Modules = import.meta.glob(
  "../assets/portfolio/blok2/*.{jpg,jpeg,png,webp,avif}",
  { eager: true }
);
const blok3Modules = import.meta.glob(
  "../assets/portfolio/blok3/*.{jpg,jpeg,png,webp,avif}",
  { eager: true }
);
const blok4Modules = import.meta.glob(
  "../assets/portfolio/blok4/*.{jpg,jpeg,png,webp,avif}",
  { eager: true }
);

const toShots = (
  modules: Record<string, { default?: string } | string>,
  titlePrefix: string
): PortfolioShot[] =>
  Object.keys(modules)
    .sort(byNumericName)
    .map((key, i) => {
      const mod = modules[key] as any;
      const src: string = typeof mod === "string" ? mod : mod.default;
      return { src, alt: `${titlePrefix} — фото ${i + 1}` };
    });

// Автоподхват
const blok1Shots = toShots(blok1Modules, "Однотонное покрытие");
const blok2Shots = toShots(blok2Modules, "Френч");
const blok3Shots = toShots(blok3Modules, "Наращивание");
const blok4Shots = toShots(blok4Modules, "Авангардные формы");

// Категории
const portfolioCategories: PortfolioCategory[] = [
  { key: "single", title: "ОДНОТОННОЕ ПОКРЫТИЕ", shots: blok1Shots },
  { key: "french", title: "ФРЕНЧ", shots: blok2Shots },
  { key: "extensions", title: "НАРАЩИВАНИЕ", shots: blok3Shots },
  { key: "custom", title: "Авангардные формы и дизайн", shots: blok4Shots },
];

const videos = [video1, video2, video3, video4, video5, video6];

const PortfolioSection: React.FC = () => {
  const [activeShots, setActiveShots] = useState<number[]>(
    () => portfolioCategories.map(() => 0)
  );

  const showPrev = (i: number) =>
    setActiveShots((prev) => {
      const next = [...prev];
      const total = portfolioCategories[i].shots.length || 1;
      next[i] = (next[i] - 1 + total) % total;
      return next;
    });

  const showNext = (i: number) =>
    setActiveShots((prev) => {
      const next = [...prev];
      const total = portfolioCategories[i].shots.length || 1;
      next[i] = (next[i] + 1) % total;
      return next;
    });

  const [videoIndex, setVideoIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const nextVideo = () => setVideoIndex((i) => (i + 1) % videos.length);
  const prevVideo = () => setVideoIndex((i) => (i - 1 + videos.length) % videos.length);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.load();
    v.play().catch(() => {});
  }, [videoIndex]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  return (
    <section id="portfolio" className="scroll-mt-20 bg-[#080808] py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid items-stretch gap-12 lg:grid-cols-[minmax(380px,1.02fr)_minmax(420px,1.18fr)] lg:gap-16 xl:grid-cols-[minmax(420px,1.05fr)_minmax(500px,1.25fr)] xl:gap-20">
          {/* Правая колонка (карточки) */}
          <div className="order-1 lg:order-2 flex w-full flex-col items-end text-right">
            <h2 className="font-heading text-4xl font-bold uppercase tracking-[0.2em] text-primary sm:text-5xl lg:text-6xl">
              ПОРТФОЛИО
            </h2>
            <p className="mt-4 max-w-md text-xs font-semibold tracking-[0.26em] text-primary/85 sm:text-sm">
              маникюр — любимый способ женщины вернуть спокойствие и гармонию.
            </p>

            <div className="mt-14 grid w-full gap-7 sm:grid-cols-2">
              {portfolioCategories.map((category, index) => {
                const current = category.shots[activeShots[index]] ?? category.shots[0];
                return (
                  <div
                    key={category.key}
                    className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-[34px] border-[3px] border-primary/65 bg-black/70 shadow-[0_0_42px_rgba(255,92,158,0.26)] sm:min-h-[240px]"
                  >
                    <div className="relative flex-1 overflow-hidden bg-black/50">
                      {current ? (
                        <img
                          src={current.src}
                          alt={current.alt}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.05]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/60">
                          Нет изображений
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-transparent to-black/40" />
                    </div>

                    <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/75 via-black/20 to-transparent px-6 py-4">
                      <span className="text-left text-sm font-black uppercase tracking-[0.28em] text-white sm:text-base">
                        {category.title}
                      </span>
                    </div>

                    <div className="pointer-events-none absolute left-3 right-3 top-1/2 -translate-y-1/2 sm:left-4 sm:right-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => showPrev(index)}
                        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/70 text-white shadow-[0_0_24px_rgba(255,92,158,0.35)] transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
                        aria-label={`Предыдущая работа: ${category.title}`}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => showNext(index)}
                        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/70 text-white shadow-[0_0_24px_rgba(255,92,158,0.35)] transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
                        aria-label={`Следующая работа: ${category.title}`}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Левый большой видео-блок */}
          <div className="order-2 lg:order-1 group relative flex w-full items-stretch justify-center lg:h-full">
            <div className="relative w-full min-h-[520px] overflow-hidden rounded-[48px] border-[3px] border-primary/70 bg-black/70 shadow-[0_0_70px_rgба(255,92,158,0.3)] lg:h-full lg:min-h-0">
              <video
                ref={videoRef}
                key={videoIndex}
                src={videos[videoIndex]}
                className="absolute inset-0 h-full w-full object-cover"
                playsInline
                autoPlay
                controls
                muted={muted}
                preload="metadata"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute left-6 right-6 top-1/2 z-10 -translate-y-1/2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevVideo}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/70 text-white shadow-[0_0_24px_rgба(255,92,158,0.35)] transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
                  aria-label="Предыдущее видео"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={nextVideo}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/70 text-white shadow-[0_0_24px_rgба(255,92,158,0.35)] transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
                  aria-label="Следующее видео"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                className="absolute top-4 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/70 text-white shadow-[0_0_20px_rgба(255,92,158,0.35)] transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
                aria-label={muted ? "Включить звук" : "Выключить звук"}
                title={muted ? "Включить звук" : "Выключить звук"}
              >
                {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>

              <span className="absolute bottom-8 left-8 text-left text-base font-black uppercase tracking-[0.4em] text-[#ff2f5f] drop-shadow-[0_0_18px_rgба(255,47,95,0.6)] sm:text-lg lg:text-xl">
                ВИДЕО-ОТЗЫВЫ
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
