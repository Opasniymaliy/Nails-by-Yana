import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHomeNavigation } from "@/hooks/useHomeNavigation";
import { Instagram, MessageCircle, Send, Check } from "lucide-react";
import yanaLogo from "@/assets/yana-pilit-logo.png";

const Footer: React.FC = () => {
  const { onHomeLinkClick } = useHomeNavigation();
  const BOOKING_URL = "https://dikidi.ru/1679582";
  const INSTAGRAM_URL =
    "https://www.instagram.com/yana_nail_dn/?igsh=MTljdmhyaTFtMTA5cQ%3D%3D#";
  const WHATSAPP_URL = "https://wa.me/+79381168780";
  const TELEGRAM_URL = "https://t.me/yana_pilit";

  // Отображаемый номер
  const phonePretty = "+7 938 116-87-80";

  // Только цифры
  const phoneDigits = useMemo(() => phonePretty.replace(/\D/g, ""), [phonePretty]);

  // Что копируем: всегда формат +7XXXXXXXXXX
  const phoneToCopy = useMemo(() => {
    if (phoneDigits.startsWith("7")) return `+${phoneDigits}`;
    if (phoneDigits.startsWith("8")) return `+7${phoneDigits.slice(1)}`;
    return `+7${phoneDigits}`;
  }, [phoneDigits]);

  const [copied, setCopied] = useState(false);
  const copyPhone = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(phoneToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Фолбэк для старых браузеров
      const ta = document.createElement("textarea");
      ta.value = phoneToCopy;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  }, [phoneToCopy]);

  return (
    <footer id="contact" className="py-20 bg-background border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* ЛОГО */}
          <div className="text-center lg:text-left">
            <Link
              to="/"
              aria-label="На главную"
              onClick={onHomeLinkClick}
              className="inline-block mb-6 group"
            >
              <img
                src={yanaLogo}
                alt="ЯНА ПИЛИТ — логотип"
                className="h-14 sm:h-16 md:h-20 w-auto drop-shadow-[0_0_18px_rgba(255,98,177,0.35)] transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </Link>
          </div>

          {/* НАВИГАЦИЯ */}
          <div className="text-center">
            <nav className="space-y-4">
              <Link
                to="/#about"
                className="block font-medium text-foreground hover:text-primary transition-colors"
              >
                ОБО МНЕ
              </Link>
              <Link
                to="/#services"
                className="block font-medium text-foreground hover:text-primary transition-colors"
              >
                УСЛУГИ
              </Link>
              <Link
                to="/portfolio"
                className="block font-medium text-foreground hover:text-primary transition-colors"
              >
                ПОРТФОЛИО
              </Link>
              <Link
                to="/reviews"
                className="block font-medium text-foreground hover:text-primary transition-colors"
              >
                ОТЗЫВЫ
              </Link>
              <Link
                to="/certificates"
                className="block font-medium text-foreground hover:text-primary transition-colors"
              >
                СЕРТИФИКАТЫ
              </Link>
            </nav>
          </div>

          {/* КОНТАКТЫ — соцсети → номер → кнопка */}
          <div className="flex flex-col items-center lg:items-end gap-5 sm:gap-6">
            {/* соц-иконки */}
            <div className="flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <Instagram className="h-5 w-5 text-primary" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <MessageCircle className="h-5 w-5 text-primary" />
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <Send className="h-5 w-5 text-primary" />
              </a>
            </div>

            {/* номер — свой отдельный ряд */}
            <div className="w-full flex justify-center lg:justify-end">
              <button
                type="button"
                onClick={copyPhone}
                className="inline-flex items-center gap-2 text-foreground text-lg font-medium hover:text-primary transition-colors"
                title={copied ? "" : "Нажмите, чтобы скопировать номер"}
                aria-live="polite"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-primary font-semibold">Скопировано!</span>
                  </>
                ) : (
                  <span>{phonePretty}</span>
                )}
              </button>
            </div>

            {/* кнопка записи — свой ряд */}
            <div className="w-full flex justify-center lg:justify-end">
              <Button asChild className="btn-hero text-lg px-8 py-3">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  ЗАПИСАТЬСЯ
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
