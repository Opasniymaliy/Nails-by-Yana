import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHomeNavigation } from "@/hooks/useHomeNavigation";
import { Instagram, MessageCircle, Send, Check, X } from "lucide-react";
import yanaLogo from "@/assets/yana-pilit-logo.png";

/** <<< твои ссылки >>> */
const INSTAGRAM_URL = "https://www.instagram.com/yana_nail_dn/?igsh=MTljdmhyaTFtMTA5cQ%3D%3D#";
const WHATSAPP_URL  = "https://wa.me/+79381168780";
const TELEGRAM_URL  = "https://t.me/yana_pilit";
/** <<< /твои ссылки >>> */

const PHONE_DISPLAY = "+7 938 116-87-80";
const PHONE_COPY    = "+79381168780";

const Header: React.FC = () => {
  const { onHomeLinkClick } = useHomeNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // блокируем прокрутку под мобильным меню
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // закрытие по ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const copyPhone = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PHONE_COPY);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }, []);

  /** Шапка:
   *  — на мобилке всегда чёрная;
   *  — на десктопе прежняя логика (прозрачная сверху, затемняется при скролле/меню).
   */
  const headerClass =
    "fixed inset-x-0 top-0 z-50 bg-background transition-colors duration-200 " +
    (menuOpen
      ? "md:bg-background md:border-b md:border-primary/20"
      : isScrolled
      ? "md:bg-background/95 md:backdrop-blur-sm md:border-b md:border-primary/20"
      : "md:bg-transparent md:border-transparent");

  // фиксированная позиция бургер-кнопки (с учётом safe-area)
  const burgerSafePos: React.CSSProperties = {
    top:  "calc(env(safe-area-inset-top, 0px) + 14px)",
    right:"calc(env(safe-area-inset-right, 0px) + 14px)",
  };

  // ЕДИНЫЙ МОБИЛЬНЫЙ ЛОГОТИП, который «переезжает»
  // ширина панели = 82vw -> левая кромка панели = 18vw
  const mobileLogoSafePos: React.CSSProperties = {
    top:  "calc(env(safe-area-inset-top, 0px) + 10px)",
    left: "calc(env(safe-area-inset-left, 0px) + 14px)",
    transform: menuOpen ? "translateX(18vw)" : "translateX(0)", // движение влево<->вправо
    transition: "transform 320ms ease, opacity 160ms ease",
  };

  return (
    <>
      {/* МОБИЛЬНЫЙ «переезжающий» логотип (на десктопе скрываем) */}
      <Link
        to="/"
        aria-label="На главную"
        onClick={onHomeLinkClick}
        className="pointer-events-auto fixed z-[75] select-none md:hidden"
        style={mobileLogoSafePos}
      >
        <img
          src={yanaLogo}
          alt="ЯНА ПИЛИТ — логотип"
          className="h-10 w-auto object-contain drop-shadow-[0_0_18px_rgba(255,98,177,0.35)]"
        />
      </Link>

      <header className={headerClass}>
        <div className="mx-auto w-full max-w-screen-2xl px-4">
          <nav className="flex h-16 items-center gap-4">
            {/* ЛОГО — на десктопе видим, на мобилке скрываем (там едет отдельный) */}
            <Link
              to="/"
              aria-label="На главную"
              onClick={onHomeLinkClick}
              className="group relative z-[75] hidden md:block pointer-events-auto"
            >
              <img
                src={yanaLogo}
                alt="ЯНА ПИЛИТ — логотип"
                className="h-14 w-auto object-contain drop-shadow-[0_0_18px_rgba(255,98,177,0.35)] transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </Link>

            {/* Десктоп-меню */}
            <div className="ml-6 hidden md:flex flex-wrap items-center gap-6">
              <Link to="/#about" className="text-foreground hover:text-primary transition-colors">
                ОБО МНЕ
              </Link>
              <Link to="/#services" className="text-foreground hover:text-primary transition-colors">
                УСЛУГИ
              </Link>
              <Link to="/portfolio" className="text-foreground hover:text-primary transition-colors">
                ПОРТФОЛИО
              </Link>
              <Link to="/reviews" className="text-foreground hover:text-primary transition-colors">
                ОТЗЫВЫ
              </Link>
              <Link to="/certificates" className="text-foreground hover:text-primary transition-colors">
                СЕРТИФИКАТЫ
              </Link>
            </div>

            {/* Контакты (десктоп) */}
            <div className="ml-auto hidden md:flex items-center gap-3">
              <Button asChild variant="ghost" size="icon" className="rounded-full bg-primary/10 hover:bg-primary/20">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-5 w-5 text-primary" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="rounded-full bg-primary/10 hover:bg-primary/20">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="rounded-full bg-primary/10 hover:bg-primary/20">
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                  <Send className="h-5 w-5 text-primary" />
                </a>
              </Button>
              <button
                onClick={copyPhone}
                className="pl-3 pr-1 py-1 rounded-md text-foreground hover:text-primary transition-colors cursor-copy"
                aria-live="polite"
                title="Нажмите, чтобы скопировать номер"
              >
                <span className="inline-flex items-center gap-1.5">
                  {copied && <Check className="h-4 w-4" />}
                  {copied ? "Скопировано!" : PHONE_DISPLAY}
                </span>
              </button>
            </div>
          </nav>
        </div>

        {/* Бургер (фиксированный, виден над контентом) */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Открыть меню"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          style={burgerSafePos}
          className={`md:hidden fixed z-[70] inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-black/25 text-foreground backdrop-blur-sm shadow-[0_4px_18px_rgba(0,0,0,.35)] transition-opacity ${
            menuOpen ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Мобильное меню (панель без собственного лого — используем «едущий» сверху) */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[60] transition-opacity ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="absolute inset-0 bg-black/60" onClick={() => setMenuOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-[82%] max-w-[360px] bg-background border-l border-white/10 shadow-2xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* верхняя полоса: только кнопка «закрыть» */}
          <div className="flex items-center justify-end px-5 h-16 border-b border-white/10">
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Закрыть меню"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/5"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="px-5 py-4 space-y-2">
            <Link
              to="/#about"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-left text-lg py-2 text-foreground hover:text-primary"
            >
              ОБО МНЕ
            </Link>
            <Link
              to="/#services"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-left text-lg py-2 text-foreground hover:text-primary"
            >
              УСЛУГИ
            </Link>
            <Link
              to="/portfolio"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-left text-lg py-2 text-foreground hover:text-primary"
            >
              ПОРТФОЛИО
            </Link>
            <Link
              to="/reviews"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-left text-lg py-2 text-foreground hover:text-primary"
            >
              ОТЗЫВЫ
            </Link>
            <Link
              to="/certificates"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-left text-lg py-2 text-foreground hover:text-primary"
            >
              СЕРТИФИКАТЫ
            </Link>
          </nav>

          <div className="mt-4 px-5 space-y-4">
            <div className="flex items-center gap-3">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20">
                <Instagram className="h-5 w-5 text-primary" />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20">
                <MessageCircle className="h-5 w-5 text-primary" />
              </a>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20">
                <Send className="h-5 w-5 text-primary" />
              </a>
            </div>

            <button onClick={copyPhone} className="text-left text-foreground hover:text-primary transition-colors" aria-live="polite">
              {copied ? <span className="inline-flex items-center gap-2"><Check className="h-4 w-4" /> Скопировано!</span> : PHONE_DISPLAY}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
