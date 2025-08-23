import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Users, TrendingUp, Clock, Shield, Zap, CheckCircle, ArrowRight, BarChart3, LineChart as LineChartIcon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import Header from './Header';

// Util: BRL formatter
const brl = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const PartnershipPage: React.FC = () => {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  // Simulador states
  const [price, setPrice] = useState<number>(1497);
  const [projects, setProjects] = useState<number>(5);
  const [includeMaintenance, setIncludeMaintenance] = useState<boolean>(true);
  const [maintenanceFee, setMaintenanceFee] = useState<number>(99);

  const BASE_COST = 299; // custo fixo por projeto

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setShowSticky(window.scrollY > 420);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleContactPartnership = useCallback(() => {
    setIsFormSubmitting(true);

    const whatsappMessage = encodeURIComponent(`🤝 *Parceria para Agências*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👋 Olá! Tenho interesse em conhecer melhor como funciona a parceria de landings rápidas.

🎯 *Interesse:*  
Quero entender os próximos passos e como podemos começar.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 *Enviado em:* ${new Date().toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo',
    })}
🌐 *Via:* johnnightsteel.com/parceria`);

    const whatsappUrl = `https://wa.me/557132159293?text=${whatsappMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setIsFormSubmitting(false);
    }, 800);
  }, []);

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Mais Lucro para sua Agência',
      description:
        'Revenda com sua marca e defina sua margem.',
      highlight: 'Margem 3x a 5x',
    },
    {
      icon: Clock,
      title: 'Entrega em até 48h',
      description:
        'Você manda o briefing, eu desenvolvo e entrego pronto para publicar em até 48 horas.',
      highlight: 'Velocidade real',
    },
    {
      icon: Zap,
      title: 'Zero Peso Operacional',
      description:
        'Sem equipe interna, sem gargalos. Você fecha clientes; eu cuido da produção.',
      highlight: 'Escala sem dor',
    },
    {
      icon: Shield,
      title: 'Suporte e Qualidade',
      description:
        'Revisão técnica em todas as entregas + 30 dias de suporte para ajustes simples.',
      highlight: 'Confiança total',
    },
  ] as const;

  const processSteps = [
    {
      number: '01',
      title: 'Você envia o briefing',
      description: 'Só alguns pontos-chave do cliente e do objetivo da página.',
    },
    {
      number: '02',
      title: 'Eu desenvolvo',
      description: 'Criação, copy, layout e publicação — tudo por minha conta.',
    },
    {
      number: '03',
      title: 'Entrega em até 48h',
      description: 'Você recebe pronto para entregar e faturar.',
    },
    {
      number: '04',
      title: 'Você revende',
      description: 'Entrega como sendo da sua agência, no preço que quiser.',
    },
  ] as const;

  // Cálculos do simulador
  const profitPerProject = Math.max(0, price - BASE_COST);
  const monthlyProfit = profitPerProject * projects + (includeMaintenance ? maintenanceFee * projects : 0);
  const marginMultiplier = price / BASE_COST;

  // Dados do gráfico (1 a 12 projetos/mês)
  const chartData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const qty = i + 1;
      const total = profitPerProject * qty + (includeMaintenance ? maintenanceFee * qty : 0);
      return { qty, total };
    });
  }, [profitPerProject, includeMaintenance, maintenanceFee]);

  // Cenários prontos
  const scenarios = [997, 1497, 1997];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-midnight/[0.03]" />
        <div className="absolute -top-24 -right-24 w-[36rem] h-[36rem] rounded-full bg-midnight/[0.06] blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-brand-light/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.span {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center px-4 py-2 bg-midnight/5 text-midnight text-sm font-medium rounded-full border border-silver/50">
            <Users className="w-4 h-4 mr-2" />
            Parceria para Agências
          </motion.span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black mb-6 text-obsidian leading-tight mt-6">
            <TypeAnimation
              sequence={["Sites em até 48h", 1200, "Landings em até 48h", 1800]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
            <br />
            <span className="text-midnight">para seus clientes</span>
          </h1>

          <motion.p {...fadeUp} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl md:text-2xl text-gunmetal font-light leading-relaxed mb-8 max-w-3xl mx-auto">
            Você fecha clientes, eu entrego. Mais velocidade, mais lucro e zero peso operacional para sua agência.
          </motion.p>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.35 }} className="flex items-center justify-center gap-3 mb-10">
            <span className="text-sm text-gunmetal/80 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-silver/60">
              <Sparkles className="w-4 h-4" /> 100+ LPs entregues em 2025
            </span>
            <span className="text-sm text-gunmetal/80 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-silver/60">
              <Clock className="w-4 h-4" /> Tempo médio: 42h
            </span>
          </motion.div>

          <motion.button
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.45 }}
            onClick={handleContactPartnership}
            disabled={isFormSubmitting}
            className="btn-primary text-lg px-8 py-4 rounded-full disabled:opacity-50 inline-flex items-center justify-center"
          >
            {isFormSubmitting ? 'Abrindo conversa...' : 'Reservar um slot'}
            <ArrowRight className="w-5 h-5 ml-3" />
          </motion.button>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-white via-brand-light/20 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-obsidian">Como funciona na prática?</h2>
            <p className="text-lg md:text-xl text-gunmetal font-light max-w-3xl mx-auto leading-relaxed">
              3 passos para você vender mais sem travar operação.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.slice(0, 3).map((step, index) => (
              <motion.div key={step.number} {...fadeUp} transition={{ duration: 0.6, delay: index * 0.15 }} className="text-center p-8 rounded-2xl border border-silver/40 bg-white/70 backdrop-blur">
                <div className="w-14 h-14 bg-midnight text-white rounded-2xl flex items-center justify-center font-display font-bold text-lg mb-4 mx-auto">
                  {step.number}
                </div>
                <h4 className="text-lg font-display font-semibold text-obsidian mb-2">{step.title}</h4>
                <p className="text-gunmetal text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-white via-white to-midnight/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 text-obsidian">Por que sua agência vai escalar mais?</h2>
            <p className="text-lg md:text-xl text-gunmetal font-light max-w-3xl mx-auto leading-relaxed">
              Mais lucro, mais velocidade, menos dor de cabeça. Você cuida do cliente; eu cuido da entrega.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div key={benefit.title} {...fadeUp} transition={{ duration: 0.6, delay: index * 0.12 }} className="p-6 rounded-2xl border border-silver/40 bg-white/70 backdrop-blur h-full">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-steel-highlight/20 to-silver/20 rounded-2xl flex items-center justify-center border border-silver/30 flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-midnight" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-display font-semibold text-obsidian">{benefit.title}</h3>
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{benefit.highlight}</span>
                    </div>
                    <p className="text-gunmetal text-sm leading-relaxed">{benefit.description}</p>
                    <div className="flex items-center text-midnight text-xs font-medium mt-3">
                      <CheckCircle className="w-4 h-4 mr-1.5" /> Incluído na parceria
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulador de Lucro Avançado */}
      <section className="py-18 bg-gradient-to-b from-brand-light/10 via-white to-brand-light/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            {/* Painel de controles */}
            <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="p-6 rounded-2xl border border-silver/40 bg-white/70 backdrop-blur">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-midnight" />
                <h3 className="text-xl font-display font-semibold text-obsidian">Simule seu lucro</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gunmetal mb-1">Quanto você cobra por landing page?</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gunmetal/70">R$</span>
                    <input
                      type="number"
                      min={0}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value || 0))}
                      className="border border-silver rounded-xl px-4 py-3 text-base w-full focus:outline-none focus:ring-2 focus:ring-midnight"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[997, 1497, 1997].map((v) => (
                      <button
                        key={v}
                        onClick={() => setPrice(v)}
                        className={`px-3 py-1.5 rounded-full text-xs border ${price === v ? 'bg-midnight text-white border-midnight' : 'border-silver text-gunmetal hover:bg-silver/20'}`}
                      >
                        {brl(v)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gunmetal mb-1">Projetos por mês</label>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={projects}
                    onChange={(e) => setProjects(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-sm text-gunmetal mt-1">{projects} projeto(s)/mês</div>
                </div>

                <div className="hidden flex items-center justify-between gap-4">
                  <label className="text-sm text-gunmetal flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeMaintenance}
                      onChange={(e) => setIncludeMaintenance(e.target.checked)}
                      className="accent-midnight"
                    />
                    Incluir manutenção mensal
                  </label>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${includeMaintenance ? 'text-gunmetal' : 'text-gunmetal/40'}`}>R$</span>
                    <input
                      type="number"
                      min={0}
                      value={maintenanceFee}
                      onChange={(e) => setMaintenanceFee(Number(e.target.value || 0))}
                      disabled={!includeMaintenance}
                      className={`border border-silver rounded-xl px-3 py-2 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-midnight ${!includeMaintenance ? 'opacity-50' : ''}`}
                    />
                    <span className={`text-sm ${includeMaintenance ? 'text-gunmetal' : 'text-gunmetal/40'}`}>/site</span>
                  </div>
                </div>

                {/* Resumo */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="p-4 rounded-xl border border-silver/40 bg-white/60">
                    <div className="text-[11px] text-gunmetal/70">Lucro por projeto</div>
                    <div className="text-lg font-semibold">{brl(profitPerProject)}</div>
                  </div>
                  <div className="p-4 rounded-xl border border-silver/40 bg-white/60">
                    <div className="text-[11px] text-gunmetal/70">Lucro mensal</div>
                    <div className="text-lg font-semibold">{brl(monthlyProfit)}</div>
                  </div>
                  <div className="p-4 rounded-xl border border-silver/40 bg-white/60">
                    <div className="text-[11px] text-gunmetal/70">Multiplicador</div>
                    <div className="text-lg font-semibold">{marginMultiplier.toFixed(1)}x</div>
                  </div>
                </div>

                <button onClick={handleContactPartnership} className="mt-5 btn-primary px-6 py-3 rounded-xl inline-flex items-center justify-center">
                  Falar sobre parceria
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>

            {/* Gráfico */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="p-6 rounded-2xl border border-silver/40 bg-white/70 backdrop-blur">
              <div className="flex items-center gap-2 mb-4">
                <LineChartIcon className="w-5 h-5 text-midnight" />
                <h3 className="text-xl font-display font-semibold text-obsidian">Crescimento do lucro por mês</h3>
              </div>
              <p className="text-sm text-gunmetal/80 mb-4">Simulação de 1 a 12 projetos mensais com os parâmetros atuais.</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="qty" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(v) => `R$${Math.round(Number(v)).toLocaleString('pt-BR')}`} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v: any) => brl(Number(v))} labelFormatter={(l) => `${l} projeto(s)/mês`} />
                    <Line type="monotone" dataKey="total" dot={false} strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gunmetal/80">
                Exemplo com preço de {brl(price)}, {projects} projeto(s)/mês e {includeMaintenance ? `manutenção de ${brl(maintenanceFee)}/site` : 'sem manutenção'}.
              </div>
            </motion.div>
          </div>

          {/* Cenários prontos */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }} className="mt-10 grid sm:grid-cols-3 gap-4">
            {scenarios.map((p) => {
              const per = Math.max(0, p - BASE_COST);
              return (
                <button key={p} onClick={() => setPrice(p)} className="text-left p-5 rounded-2xl border border-silver/40 bg-white/70 hover:bg-white transition-colors">
                  <div className="text-xs text-gunmetal/70 mb-1">Se cobrar</div>
                  <div className="text-lg font-semibold">{brl(p)}</div>
                  <div className="text-xs text-gunmetal/70 mt-2">Lucro por projeto</div>
                  <div className="font-medium">{brl(per)}</div>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-midnight/95 via-midnight to-obsidian text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 {...fadeUp} transition={{ duration: 0.7 }} className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-obsidian font-bold mb-6 leading-tight">
            Quer testar com um <span className="text-brand-light">projeto piloto?</span>
          </motion.h2>
          <motion.p {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }} className="text-xl text-gunmetal font-light max-w-3xl mx-auto mb-8 leading-relaxed">
            Envie o briefing de um cliente, receba a landing em até 48h e revenda com sua marca.
          </motion.p>

          <motion.button {...fadeUp} transition={{ duration: 0.5, delay: 0.25 }} onClick={handleContactPartnership} disabled={isFormSubmitting} className="btn-primary text-lg px-10 py-5 rounded-full disabled:opacity-50 inline-flex items-center justify-center">
            {isFormSubmitting ? 'Abrindo conversa...' : 'Reservar meu slot'}
            <ArrowRight className="inline-block w-5 h-5 ml-3" />
          </motion.button>

          <p className="text-sm text-silver font-medium mt-6">📱 Conversa direta via WhatsApp • Resposta em até 2h</p>
          <p className="text-xs text-silver/70 font-light mt-2">Garantia: se atrasar, 20% de desconto imediato.</p>
        </div>
      </section>

      {/* Sticky CTA */}
      {showSticky && (
        <div className="fixed bottom-4 left-0 right-0 z-50">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white/90 backdrop-blur border border-silver/40 rounded-2xl shadow-xl p-3 flex items-center justify-between">
              <div className="text-sm text-gunmetal px-2">Pronto para um piloto esta semana?</div>
              <button onClick={handleContactPartnership} className="btn-primary px-5 py-2 rounded-xl inline-flex items-center">
                Falar no WhatsApp <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnershipPage;
