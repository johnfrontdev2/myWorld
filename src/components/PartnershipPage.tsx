import React, { useCallback, useState } from 'react';
import { Users, TrendingUp, Clock, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import Header from './Header';

const PartnershipPage: React.FC = () => {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
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
      timeZone: 'America/Sao_Paulo'
    })}
🌐 *Via:* johnnightsteel.com/parceria`);

    const whatsappUrl = `https://wa.me/557132159293?text=${whatsappMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setIsFormSubmitting(false);
    }, 1000);
  }, []);

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Mais Lucro para sua Agência',
      description: 'Revenda landings com a sua marca e defina a margem que quiser. Sem custo fixo, só paga quando vende.',
      highlight: 'Margem 3x a 5x'
    },
    {
      icon: Clock,
      title: 'Entrega em Até 48h',
      description: 'Você envia o briefing, eu desenvolvo e entrego a landing pronta em até 48 horas.',
      highlight: 'Velocidade garantida'
    },
    {
      icon: Zap,
      title: 'Zero Peso Operacional',
      description: 'Nada de dor com equipe, prazos ou execução. Você foca em fechar clientes, eu cuido da entrega.',
      highlight: 'Escalabilidade real'
    },
    {
      icon: Shield,
      title: 'Suporte e Qualidade',
      description: 'Todas as entregas passam por revisão + 30 dias de suporte para ajustes simples.',
      highlight: 'Confiança total'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Você envia o briefing',
      description: 'Basta passar o que o cliente precisa em alguns pontos-chave.'
    },
    {
      number: '02',
      title: 'Eu desenvolvo',
      description: 'Executo o projeto e deixo a landing pronta para uso.'
    },
    {
      number: '03',
      title: 'Entrega em até 48h',
      description: 'Você recebe o material pronto para entregar ao cliente.'
    },
    {
      number: '04',
      title: 'Você revende',
      description: 'Entrega como sendo da sua agência, no valor que quiser.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-20 lg:pt-32 lg:pb-32 bg-gradient-to-br from-white via-white to-midnight/[0.02]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center px-4 py-2 bg-midnight/5 text-midnight text-sm font-medium rounded-full border border-silver/50">
            <Users className="w-4 h-4 mr-2" />
            Parceria para Agências
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black mb-8 text-obsidian leading-none mt-6">
            Sites em até 48h
            <br />
            <span className="text-midnight"> para sua agência</span>
          </h1>

          <p className="text-xl md:text-2xl text-gunmetal font-light leading-relaxed mb-12 max-w-3xl mx-auto">
            Você fecha clientes, eu entrego. Mais velocidade, mais lucro e zero peso operacional para sua agência.
          </p>

          <button
            onClick={handleContactPartnership}
            disabled={isFormSubmitting}
            className="btn-primary text-lg px-8 py-4 disabled:opacity-50 inline-flex items-center justify-center"
          >
            {isFormSubmitting ? 'Abrindo conversa...' : 'Quero testar'}
            <ArrowRight className="w-5 h-5 ml-3" />
          </button>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-white via-brand-light to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-obsidian">
              Como funciona na prática?
            </h2>
            <p className="text-xl text-gunmetal font-light max-w-3xl mx-auto leading-relaxed">
              Simples: você manda o briefing, eu entrego em até 48h e você apresenta como seu.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-16 h-16 bg-midnight text-white rounded-2xl flex items-center justify-center font-display font-bold text-lg mb-4 mx-auto">
                  {step.number}
                </div>
                <h4 className="text-lg font-display font-semibold text-obsidian mb-3">{step.title}</h4>
                <p className="text-gunmetal text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-white via-white to-midnight/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-obsidian">
              Por que sua agência vai escalar mais?
            </h2>
            <p className="text-xl text-gunmetal font-light max-w-3xl mx-auto leading-relaxed">
              Mais lucro, mais velocidade, menos dor de cabeça. Você cuida do cliente, eu cuido da entrega.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="card-elevated p-8 h-full">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-steel-highlight/20 to-silver/20 rounded-2xl flex items-center justify-center border border-silver/30 flex-shrink-0">
                    <benefit.icon className="w-7 h-7 text-midnight" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-display font-semibold text-obsidian">{benefit.title}</h3>
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                        {benefit.highlight}
                      </span>
                    </div>
                    <p className="text-gunmetal leading-relaxed mb-4">{benefit.description}</p>
                    <div className="flex items-center text-midnight text-sm font-medium">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>Incluído na parceria</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-midnight/95 via-midnight to-obsidian">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-8 leading-tight text-white">
            Quer testar com um projeto piloto?
          </h2>
          <p className="text-xl font-light leading-relaxed mb-12 text-silver">
            Envie o briefing de um cliente, receba a landing em até 48h e revenda com sua marca.
          </p>

          <button
            onClick={handleContactPartnership}
            disabled={isFormSubmitting}
            className="btn-primary text-lg px-10 py-5 rounded-full disabled:opacity-50 inline-flex items-center justify-center"
          >
            {isFormSubmitting ? 'Abrindo conversa...' : 'Quero reservar'}
            <ArrowRight className="inline-block w-5 h-5 ml-3" />
          </button>

          <p className="text-sm text-silver font-medium mt-6">
            📱 Conversa direta via WhatsApp • Resposta em até 2h
          </p>
          <p className="text-xs text-silver/70 font-light mt-2">
            Garantia: se atrasar, 20% de desconto imediato.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PartnershipPage;
