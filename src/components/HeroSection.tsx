import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHomeNavigation } from "@/hooks/useHomeNavigation";
import pantherHero from "@/assets/panther-hero.jpg";

const BOOKING_URL = "https://dikidi.ru/1679582";

const HeroSection = () => {
  const { onHomeLinkClick } = useHomeNavigation();

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#050505]">
      {/* Фон секции + пантера справа только на ПК */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#050505]" aria-hidden="true" />
        <img
          src={pantherHero}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[-12%] top-1/2 hidden h-[125%] max-w-none -translate-y-1/2 object-contain md:block"
        />
        <div
          className="absolute inset-0 hidden bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent md:block"
          aria-hidden="true"
        />
      </div>
      <div className="container relative z-10 mx-auto px-4 py-20 lg:py-32">
        {/* Карточка */}
        <div className="relative max-w-xl overflow-hidden rounded-[40px] border border-primary/20 bg-background/80 p-8 sm:p-12 shadow-2xl backdrop-blur-md text-left animate-slide-up">
          {/* МОБИЛКА: пантера под текстом */}
          <img
            src={pantherHero}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 z-0 h-full w-full object-cover object-right opacity-45 brightness-110 contrast-110 md:hidden"
          />
          <div
            className="absolute inset-0 z-[1] bg-gradient-to-br from-black/40 via-black/20 to-transparent md:hidden"
            aria-hidden="true"
          />

          {/* Контент поверх */}
          <div className="relative z-10 space-y-6">
            <Link
              to="/"
              onClick={onHomeLinkClick}
              className="inline-block text-sm font-semibold uppercase tracking-[0.55em] text-muted-foreground transition-colors hover:text-primary"
            >
              ЯНА ПИЛИТ
            </Link>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight uppercase">
              <span className="gradient-text">КРАСИВЫЕ НОГТИ —</span>
              <br />
              <span className="gradient-text">ЭТО ПРОСТО</span>
            </h1>
            <div className="space-y-2 text-lg sm:text-xl font-medium text-foreground">
              <p>
                ЕСЛИ ВЫ ИСКАЛИ{" "}
                <span className="text-primary font-semibold">ЛУЧШЕГО МАСТЕРА</span>
              </p>
              <p>ПО УХОДУ ЗА СВОИМИ НОГТЯМИ В</p>
              <p>ГОРОДЕ</p>
              <p className="text-primary text-3xl font-bold font-heading tracking-wide">
                РОСТОВ - НА - ДОНУ
              </p>
              <p>ТО ВЫ ЕГО НАШЛИ</p>
            </div>
            <Button asChild className="btn-hero text-lg sm:text-xl px-10 sm:px-12 py-5 sm:py-6 mt-4">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                ЗАПИСАТЬСЯ
              </a>
            </Button>
          </div>
        </div>
      </div>
      {/* Световые пятна */}
      <div
        className="absolute -left-24 top-24 hidden h-64 w-64 rounded-full bg-primary/20 blur-3xl md:block"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-1/3 h-40 w-40 rounded-full bg-secondary/30 blur-3xl"
        aria-hidden="true"
      />
      {/* РОЗОВАЯ ЛИНИЯ НА ВСЮ ШИРИНУ ЭКРАНА */}
<div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-screen z-20">
  <div className="h-[3px] md:h-[4px] bg-gradient-to-r from-transparent via-[#FF62B1] to-transparent" />
</div>
    </section>
  );
};

export default HeroSection;
