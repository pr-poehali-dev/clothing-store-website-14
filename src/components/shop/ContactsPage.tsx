import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-5xl uppercase font-semibold mb-2">Контакты</h1>
      <p className="text-white/40 mb-10">Мы всегда на связи — пишите, звоните, приходите.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          {[
            { icon: "MapPin", label: "Адрес", value: "Москва, ул. Трендовая, 12" },
            { icon: "Phone", label: "Телефон", value: "+7 (800) 555-00-12" },
            { icon: "Mail", label: "Email", value: "hello@modo-shop.ru" },
            { icon: "Clock", label: "Часы работы", value: "Пн–Вс: 10:00 – 21:00" },
          ].map(item => (
            <div key={item.label} className="glass-card rounded-2xl p-5 border border-[#1E1E1E] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#B8FF3C]/10 flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={18} className="text-[#B8FF3C]" />
              </div>
              <div>
                <div className="font-display text-xs uppercase tracking-widest text-white/30 mb-0.5">{item.label}</div>
                <div className="text-white/80 font-medium">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6 border border-[#1E1E1E]">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-16 h-16 rounded-full bg-[#B8FF3C]/15 flex items-center justify-center mb-4">
                <Icon name="Check" size={28} className="text-[#B8FF3C]" />
              </div>
              <h3 className="font-display text-2xl uppercase mb-2">Отправлено!</h3>
              <p className="text-white/40 text-sm">Мы ответим в течение нескольких часов.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h3 className="font-display text-xl uppercase mb-2">Написать нам</h3>
              {[
                { key: 'name', label: 'Имя', type: 'text', placeholder: 'Ваше имя' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'email@example.com' },
              ].map(f => (
                <div key={f.key}>
                  <label className="font-display text-xs uppercase tracking-widest text-white/30 mb-1 block">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={(form as Record<string, string>)[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#B8FF3C]/50 transition-colors text-sm"
                    required
                  />
                </div>
              ))}
              <div>
                <label className="font-display text-xs uppercase tracking-widest text-white/30 mb-1 block">Сообщение</label>
                <textarea
                  placeholder="Ваш вопрос или пожелание..."
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#B8FF3C]/50 transition-colors text-sm resize-none"
                  required
                />
              </div>
              <button type="submit" className="neon-btn py-4 rounded-xl text-sm w-full">
                Отправить сообщение
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
