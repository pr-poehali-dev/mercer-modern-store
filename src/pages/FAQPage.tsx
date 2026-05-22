import { useState } from 'react';
import Icon from '@/components/ui/icon';

const faqs = [
  {
    q: "Как быстро доставляют заказы?",
    a: "Доставка по Москве занимает 1–2 дня, по России — 3–7 рабочих дней. Мы работаем с СДЭК и Почтой России. После оформления заказа вы получите трек-номер на почту."
  },
  {
    q: "Как осуществляется возврат?",
    a: "Мы принимаем возврат в течение 14 дней с момента получения. Товар должен быть в оригинальной упаковке без следов носки. Оформите заявку через контактную форму или напишите нам на почту."
  },
  {
    q: "Как выбрать размер?",
    a: "На странице каждого товара есть размерная сетка. Мы рекомендуем измерить обхват груди, талии и бёдер, и сравнить с нашей таблицей. Если вы сомневаетесь — напишите нам, поможем подобрать."
  },
  {
    q: "Какие способы оплаты доступны?",
    a: "Мы принимаем банковские карты Visa, Mastercard, МИР, а также СБП. Оплата защищена SSL-шифрованием. Оплата при получении не предусмотрена."
  },
  {
    q: "Из каких материалов сделана одежда?",
    a: "Мы работаем только с натуральными тканями: шерсть, хлопок, шёлк, кашемир. На странице каждого товара указан состав ткани и рекомендации по уходу."
  },
  {
    q: "Есть ли у вас пункты самовывоза?",
    a: "На данный момент мы работаем только в формате интернет-магазина с доставкой. Шоурум открывается в Москве — следите за нашими обновлениями."
  },
  {
    q: "Можно ли заказать в подарок?",
    a: "Да, мы предлагаем подарочную упаковку. Выберите соответствующую опцию при оформлении заказа. Также можем вложить персональную открытку."
  },
  {
    q: "Как ухаживать за вещами Mercer?",
    a: "Большинство изделий рекомендуется стирать вручную или в деликатном режиме. Точные инструкции по уходу указаны на ярлыке и на странице товара."
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-16 border-b border-black/10">
        <div className="fade-in-up">
          <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-2">Помощь</p>
          <h1 className="font-display text-5xl lg:text-7xl font-light">FAQ</h1>
        </div>
      </div>

      {/* Questions */}
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="space-y-0 stagger">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-b border-black/10 fade-in-up"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className="text-base lg:text-lg font-light tracking-wide pr-8 group-hover:opacity-60 transition-opacity">
                  {faq.q}
                </span>
                <span className={`flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}>
                  <Icon name="Plus" size={16} />
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === i ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-sm text-black/60 leading-relaxed font-light pr-8">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 p-10 bg-black text-white text-center fade-in-up">
          <p className="font-display text-3xl font-light mb-3">Остались вопросы?</p>
          <p className="text-sm text-white/60 mb-6 font-light">Напишите нам — ответим в течение часа</p>
          <a
            href="mailto:info@mercer.ru"
            className="inline-block border border-white/30 px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-300"
          >
            Написать
          </a>
        </div>
      </div>
    </div>
  );
}
