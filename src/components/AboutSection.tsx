import yanaPortrait from '@/assets/yana-portrait.jpg';

const AboutSection = () => {
  const infoHighlights = [
    (
      <>
        <span className="font-semibold text-[#FF62B1]">Я УЖЕ 15 ЛЕТ</span>{' '}
        Я ДЕЛАЮ РУКИ И НОЖКИ МОИХ КЛИЕНТОВ НЕ ПРОСТО УХОЖЕННЫМИ, А{' '}
        <span className="font-semibold text-[#FF62B1]">БЕЗУПРЕЧНЫМИ.</span>
      </>
    ),
    (
      <>
        <span className="font-semibold text-[#FF62B1]">
          ЖИВУ И РАБОТАЮ В РОСТОВЕ-НА-ДОНУ.
        </span>
      </>
    ),
    (
      <>
        ГЛУБОКАЯ ЭКСПЕРТИЗА ПОЗВОЛЯЕТ МНЕ НЕ ТОЛЬКО{' '}
        <span className="font-semibold text-[#FF62B1]">ДЕЛАТЬ СЛОЖНЕЙШИЕ РАБОТЫ,</span>{' '}
        НО И УЧИТЬ ЭТОМУ ДРУГИХ — Я С РАДОСТЬЮ ДЕЛЮСЬ СВОИМИ ЗНАНИЯМИ НА КУРСАХ И СМОГУ{' '}
        <span className="font-semibold text-[#FF62B1]">ВАС НАУЧИТЬ ЭТОМУ С 0.</span>
      </>
    ),
    (
      <>
        ОБОЖАЮ ВЫЗОВЫ И <span className="font-semibold text-[#FF62B1]">ТРУДНЫЕ ЗАДАЧИ!</span>{' '}
        ЕСЛИ У ВАС ЕСТЬ <span className="font-semibold text-[#FF62B1]">ПРОБЛЕМА С НОГТЯМИ,</span>{' '}
        КОТОРУЮ НИКТО НЕ МОЖЕТ РЕШИТЬ, — ВАМ КО МНЕ. ВМЕСТЕ НАЙДЁМ{' '}
        <span className="font-semibold text-[#FF62B1]">РЕШЕНИЕ И СДЕЛАЕМ ВАМ НОВЫЙ ОБРАЗ ЗА 1.5 ЧАСА</span>
      </>
    ),
  ];

  return (
    <section id="about" className="relative scroll-mt-20 bg-background py-24">
      <div className="absolute inset-x-0 top-0 hidden h-64 bg-gradient-to-b from-[rgba(255,98,177,0.12)] to-transparent lg:block" />
      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          {/* Фото */}
          <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <div className="relative flex h-[22rem] w-[22rem] items-center justify-center sm:h-[26rem] sm:w-[26rem] lg:h-[30rem] lg:w-[30rem]">
              <div
                className="absolute -inset-[28%] rounded-full bg-[radial-gradient(circle,_rgba(255,98,177,0.26)_0%,_rgba(9,2,14,0)_70%)]"
                aria-hidden="true"
              />
              <div
                className="absolute -inset-[18%] rounded-full border border-[rgba(255,98,177,0.35)]"
                aria-hidden="true"
              />
              <div
                className="absolute -inset-[10%] rounded-full border border-[rgba(255,98,177,0.22)]"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top_left,_rgba(255,98,177,0.3),_rgba(11,4,15,0)_68%)]"
                aria-hidden="true"
              />

              <div className="relative h-full w-full overflow-hidden rounded-full border-[6px] border-[#FF62B1] bg-[#0b050d] shadow-[0_45px_95px_-40px_rgba(255,98,177,0.85)]">
                <img
                  src={yanaPortrait}
                  alt="Яна Пилит - мастер маникюра"
                  className="h-full w-full object-cover"

                />
                <div
                  className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[rgba(9,0,12,0.45)]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>


          {/* Текст */}
          <div className="order-1 space-y-10 text-left lg:order-2">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.48em] text-[rgba(255,98,177,0.7)]">
                Ваш эксперт в мире маникюра
              </p>
              <h2 className="font-heading text-4xl font-bold uppercase text-foreground sm:text-5xl lg:text-6xl">
                МЕНЯ ЗОВУТ <span className="text-[#FF62B1]">ЯНА</span>
              </h2>
            </div>

            <div className="flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[34rem]">
                <div
                  className="pointer-events-none absolute -inset-6 hidden rounded-[3rem] border border-[rgba(255,98,177,0.32)] sm:block"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -inset-12 hidden rounded-[3rem] border border-[rgba(255,98,177,0.18)] lg:block"
                  aria-hidden="true"
                />
                <div className="relative overflow-hidden rounded-[3rem] border-[3px] border-[rgba(255,98,177,0.68)] bg-[rgba(12,3,16,0.78)] px-8 py-10 text-lg leading-relaxed text-foreground shadow-[0_35px_90px_-45px_rgba(255,98,177,0.75)] backdrop-blur-sm sm:px-12 sm:py-14">
                  <div className="space-y-6">
                    <p>
                      <span className="font-semibold text-[#FF62B1]">
                        Ваш эксперт в мире маникюра.
                      </span>{' '}
                      Привет! Я инструктор по моделированию ногтей и действующий нейлстилист со стажем более 15 лет. Я создаю не просто ухоженные, а
                      <span className="font-semibold text-[#FF62B1]"> безупречные и стильные образы</span> для рук и ног своих клиентов в Ростове-на-Дону.
                    </p>

                    <p>
                      Моя миссия — дарить не только безупречный маникюр, но и уверенность в себе. Благодаря глубокой экспертизе я воплощаю даже самые
                      сложные и смелые идеи в жизнь.
                    </p>

                    <p className="font-semibold text-[#FF62B1] uppercase tracking-wide">
                      Почему ко мне обращаются?
                    </p>

                    <ul className="space-y-4">
                      <li>
                        <span className="text-[#FF62B1] font-semibold">Авторская методика:</span>{' '}
                        владею передовыми техниками, которые позволяют добиться идеального результата для любых ногтей — будь то укрепление, деликатное
                        восстановление или сложный дизайн.
                      </li>
                      <li>
                        <span className="text-[#FF62B1] font-semibold">Преображение за 1,5 часа:</span>{' '}
                        всего за один сеанс вы получите новый, безупречный образ, который подчеркнёт вашу индивидуальность.
                      </li>
                      <li>
                        <span className="text-[#FF62B1] font-semibold">Обучение с нуля:</span>{' '}
                        я с радостью делюсь знаниями на авторских курсах и научу вас искусству маникюра с нуля, помогая выйти на высокий профессиональный уровень.
                      </li>
                    </ul>

                    <p>
                      Готова создать для вас идеальный маникюр и помочь вам{' '}
                      <span className="font-semibold text-[#FF62B1]">раскрыть талант мастера</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* /card */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
