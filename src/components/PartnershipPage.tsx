import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Clock, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import PageTransition from './PageTransition';
import Header from './Header';

const PartnershipPage: React.FC = () => {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContactPartnership = useCallback(() => {
    setIsFormSubmitting(true);
    
    const whatsappMessage = encodeURIComponent(`🤝 *PARCERIA WHITE-LABEL*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👋 Olá! Tenho interesse em conversar sobre uma parceria white-label.

🎯 *Interesse:*
Gostaria de entender como funciona o modelo de parceria e quais são os próximos passos.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 *Enviado em:* ${new Date().toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo'
    })}
🌐 *Via:* johnnightsteel.com/partnership`);
    
    const whatsappUrl = `https://wa.me/557132159293?text=${whatsappMessage}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setIsFormSubmitting(false);
    }, 1000);
  }, []);

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Aumento de Margem de Lucro',
      description: 'Ofereça serviços premium sem os custos operacionais. Aumente sua margem em até 40% mantendo a qualidade de entrega.',
      highlight: 'Margem até 40% maior'
    },
    {
      icon: Clock,
      title: 'Redução de Estresse Operacional',
      description: 'Elimine a preocupação com execução técnica, prazos e recursos. Foque apenas na prospecção e relacionamento com clientes.',
      highlight: 'Zero estresse operacional'
    },
    {
      icon: Zap,
      title: 'Maior Velocidade de Entrega',
      description: 'Entregue projetos em metade do tempo com nossa infraestrutura especializada e processos otimizados.',
      highlight: '50% mais rápido'
    },
    {
      icon: Shield,
      title: 'Garantia de Qualidade',
      description: 'Todos os projetos seguem nossos padrões premium com revisão técnica completa antes da entrega ao cliente final.',
      highlight: '100% garantido'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Qualificação',
      description: 'Avaliamos o perfil da sua agência e definimos o modelo de parceria ideal para seus objetivos.'
    },
    {
      number: '02',
      title: 'Onboarding',
      description: 'Treinamento completo sobre processos, ferramentas e metodologia para garantir alinhamento total.'
    },
    {
      number: '03',
      title: 'Implementação',
      description: 'Início imediato dos projetos com suporte dedicado e acompanhamento em tempo real.'
    },
    {
      number: '04',
      title: 'Crescimento',
      description: 'Expansão gradual da parceria com novos serviços e oportunidades de escala.'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        
        {/* Standard Header */}
        <Header />

        {/* Hero Section */}
        <section className="pt-24 pb-20 lg:pt-32 lg:pb-32 bg-gradient-to-br from-white via-white to-midnight/[0.02] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-midnight rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              
              <ScrollReveal direction="up" delay={0.2}>
                <div className="mb-8">
                  <span className="inline-flex items-center px-4 py-2 bg-midnight/5 text-midnight text-sm font-medium font-display tracking-wide rounded-full border border-silver/50">
                    <Users className="w-4 h-4 mr-2" />
                    Parcerias White-Label
                  </span>
                </div>
              </ScrollReveal>
              
              {/* H1 - Título Principal */}
              <ScrollReveal direction="up" delay={0.3}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black mb-8 text-obsidian leading-none">
                  Expanda seus serviços
                  <br />
                  <span className="text-midnight">sem investir em infraestrutura</span>
                </h1>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.4}>
                <p className="text-xl md:text-2xl text-gunmetal font-light leading-relaxed mb-12 max-w-3xl mx-auto">
                  Parceria estratégica para agências que querem oferecer websites premium 
                  mantendo foco no que fazem de melhor: relacionamento e resultados.
                </p>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.5}>
                <motion.button
                  onClick={handleContactPartnership}
                  disabled={isFormSubmitting}
                  className="btn-primary text-lg px-8 py-4 sheen-effect disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isFormSubmitting ? 'Abrindo conversa...' : 'Quero conversar sobre parceria'}
                  <ArrowRight className="w-5 h-5 ml-3" />
                </motion.button>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* White-Label Explanation Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-white via-brand-light to-white relative">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center mb-16">
              <ScrollReveal direction="up" delay={0.2}>
                {/* H2 - Seção Explicativa */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-obsidian leading-tight">
                  Como funciona o modelo White-Label?
                </h2>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-xl text-gunmetal font-light max-w-3xl mx-auto leading-relaxed">
                  Um modelo de parceria onde você vende sob sua marca, mas a execução fica por nossa conta.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              
              {/* Content */}
              <div>
                  {/* H3 - O que é White-Label */}
                  <h3 className="text-2xl md:text-3xl font-display font-semibold text-obsidian mb-6">
                    O que é White-Label?
                  </h3>
                  <div className="space-y-6 text-gunmetal text-lg leading-relaxed">
                    <p>
                      <strong className="text-midnight">White-Label</strong> é um modelo de negócios onde 
                      uma empresa (nós) produz serviços que outra empresa (você) vende sob sua própria marca.
                    </p>
                    <p>
                      Na prática, você mantém o relacionamento com o cliente, fecha a venda e cuida da 
                      estratégia, enquanto nós executamos todo o desenvolvimento técnico nos bastidores.
                    </p>
                    <p>
                      <strong className="text-midnight">Para o cliente final</strong>, você é quem entrega 
                      tudo. Sua marca, sua assinatura, seu sucesso.
                    </p>
                  </div>
              </div>

              {/* Visual */}
              <div>
                <ScrollReveal direction="right" delay={0.4}>
                  <div className="card-elevated p-8 bg-white">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 p-4 bg-midnight/5 rounded-lg">
                        <div className="w-12 h-12 bg-midnight/10 rounded-full flex items-center justify-center">
                          <span className="font-display font-bold text-midnight">1</span>
                        </div>
                        <div>
                          <h4 className="font-display font-semibold text-obsidian">Você Vende</h4>
                          <p className="text-sm text-gunmetal">Prospecção e fechamento</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-steel-highlight/5 rounded-lg">
                        <div className="w-12 h-12 bg-steel-highlight/10 rounded-full flex items-center justify-center">
                          <span className="font-display font-bold text-steel-highlight">2</span>
                        </div>
                        <div>
                          <h4 className="font-display font-semibold text-obsidian">Nós Executamos</h4>
                          <p className="text-sm text-gunmetal">Desenvolvimento e entrega</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="font-display font-bold text-green-600">3</span>
                        </div>
                        <div>
                          <h4 className="font-display font-semibold text-obsidian">Cliente Satisfeito</h4>
                          <p className="text-sm text-gunmetal">Sua marca cresce</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Process Implementation */}
            <div className="text-center mb-12">
              <ScrollReveal direction="up" delay={0.4}>
                {/* H3 - Processo de Implementação */}
                <h3 className="text-2xl md:text-3xl font-display font-semibold text-obsidian mb-8">
                  Processo de Implementação
                </h3>
              </ScrollReveal>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <ScrollReveal key={step.number} direction="up" delay={0.1 * (index + 1)}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-midnight text-white rounded-2xl flex items-center justify-center font-display font-bold text-lg mb-4 mx-auto">
                      {step.number}
                    </div>
                    <h4 className="text-lg font-display font-semibold text-obsidian mb-3">
                      {step.title}
                    </h4>
                    <p className="text-gunmetal text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-white via-white to-midnight/[0.01] relative">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center mb-16">
              <ScrollReveal direction="up" delay={0.2}>
                {/* H2 - Benefícios para Agências */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-obsidian leading-tight">
                  Benefícios Exclusivos para Agências
                </h2>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-xl text-gunmetal font-light max-w-3xl mx-auto leading-relaxed">
                  Transforme sua agência em uma operação mais lucrativa, eficiente e escalável.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <ScrollReveal key={benefit.title} direction="up" delay={0.1 * (index + 1)}>
                  <motion.div
                    className="card-elevated p-8 h-full group"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-steel-highlight/20 to-silver/20 rounded-2xl flex items-center justify-center border border-silver/30 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <benefit.icon className="w-7 h-7 text-midnight" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {/* H3 - Títulos dos Benefícios */}
                          <h3 className="text-xl font-display font-semibold text-obsidian">
                            {benefit.title}
                          </h3>
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                            {benefit.highlight}
                          </span>
                        </div>
                        
                        <p className="text-gunmetal leading-relaxed mb-4">
                          {benefit.description}
                        </p>
                        
                        <div className="flex items-center text-midnight text-sm font-medium">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span>Garantido na parceria</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-midnight/95 via-midnight to-obsidian relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-steel-highlight rounded-full blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            
            <ScrollReveal direction="up" delay={0.2}>
              {/* H2 - CTA Final */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-8 leading-tight text-obsidian">
                Pronto para expandir sem limites?
              </h2>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-xl font-light leading-relaxed mb-12 text-gunmetal">
                Vamos conversar sobre como estruturar uma parceria que transforme 
                sua agência numa operação mais lucrativa e escalável.
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.4}>
              <div className="space-y-8">
                <motion.button
                  onClick={handleContactPartnership}
                  disabled={isFormSubmitting}
                  className="bg-white text-midnight font-display font-semibold text-lg px-10 py-5 rounded-full hover:bg-silver hover:scale-105 transition-all duration-300 shadow-2xl disabled:opacity-50 border-2 border-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isFormSubmitting ? 'Abrindo conversa...' : 'Quero saber mais!'}
                  <ArrowRight className="inline-block w-5 h-5 ml-3" />
                </motion.button>
                
                <p className="text-sm text-gunmetal font-medium">
                  📱 Conversa direta via WhatsApp • Resposta em até 2 horas
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default PartnershipPage;