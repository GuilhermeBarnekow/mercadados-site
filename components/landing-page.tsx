"use client";

import {
  ArrowRight,
  BarChart2,
  LineChart,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Percent,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

function AnimatedBits() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const bits: {
      x: number;
      y: number;
      value: string;
      color: string;
      speed: number;
    }[] = [];

    for (let i = 0; i < 50; i++) {
      bits.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        value: Math.floor(Math.random() * 2).toString(),
        color:
          Math.random() > 0.5
            ? "rgba(255, 255, 255, 0.5)"
            : "rgba(34, 197, 94, 0.5)",
        speed: Math.random() * 2 + 1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bits.forEach((bit) => {
        ctx.font = "20px Arial";
        ctx.fillStyle = bit.color;
        ctx.fillText(bit.value, bit.x, bit.y);

        bit.y += bit.speed;
        if (bit.y > canvas.height) {
          bit.y = 0;
          bit.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
  );
}

function AnimatedIcon({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (iconRef.current) {
      observer.observe(iconRef.current);
    }

    return () => {
      if (iconRef.current) {
        observer.unobserve(iconRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={iconRef}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Cabeçalho */}
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link className="flex items-center justify-center" href="#">
          <span className="text-2xl font-bold">
            <span className="text-black">Merca</span>
            <span className="text-green-500">Dados</span>
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Recursos
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Preços
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Sobre
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contato
          </Link>
        </nav>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1">
        {/* Seção Hero */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black relative overflow-hidden">
          <AnimatedBits />
          <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center mx-auto">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
                  Acessível para crescer junto com você
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Com a MercaDados, você terá acesso a dados de mercado precisos
                  e análises práticas para tomar decisões assertivas e conquistar
                  novas oportunidades.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-green-500 text-white hover:bg-green-600">
                  Comece Agora
                </Button>
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-black"
                >
                  Saiba Mais
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Nossos Recursos */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Nossos Recursos
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <BarChart2 className="w-12 h-12 text-green-500" />
                <h3 className="text-xl font-bold">Análise de Mercado</h3>
                <p className="text-sm text-gray-500 text-center">
                  Insights detalhados sobre tendências e padrões de mercado.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <LineChart className="w-12 h-12 text-green-500" />
                <h3 className="text-xl font-bold">Previsões Precisas</h3>
                <p className="text-sm text-gray-500 text-center">
                  Projeções confiáveis baseadas em dados históricos e atuais.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <TrendingUp className="w-12 h-12 text-green-500" />
                <h3 className="text-xl font-bold">Oportunidades de Crescimento</h3>
                <p className="text-sm text-gray-500 text-center">
                  Identificação de áreas potenciais para expansão e investimento.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <Users className="w-12 h-12 text-green-500" />
                <h3 className="text-xl font-bold">Análise Competitiva</h3>
                <p className="text-sm text-gray-500 text-center">
                  Comparações detalhadas com concorrentes do setor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Sobre a MercaDados */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Sobre a MercaDados
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 items-center">
              <div className="space-y-4">
                <p className="text-gray-500 md:text-lg">
                  A MercaDados é uma startup inovadora e dedicada a democratizar a
                  inteligência de dados e aumentar a eficiência em toda a cadeia do
                  varejo.
                </p>
                <p className="text-gray-500 md:text-lg">
                  Conectada a diversos distribuidores nacionais e indústrias
                  globais, nossa principal entrega de valor é impulsionar a
                  rentabilidade de mercados e redes de médio e pequeno porte.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <AnimatedIcon>
                  <div className="flex flex-col items-center space-y-2 p-4 bg-white rounded-lg shadow-md">
                    <ShoppingCart className="w-12 h-12 text-green-500" />
                    <p className="text-sm text-center font-medium">
                      Decisões de compras embasadas
                    </p>
                  </div>
                </AnimatedIcon>
                <AnimatedIcon>
                  <div className="flex flex-col items-center space-y-2 p-4 bg-white rounded-lg shadow-md">
                    <DollarSign className="w-12 h-12 text-green-500" />
                    <p className="text-sm text-center font-medium">
                      Clareza em custos e impostos
                    </p>
                  </div>
                </AnimatedIcon>
                <AnimatedIcon>
                  <div className="flex flex-col items-center space-y-2 p-4 bg-white rounded-lg shadow-md">
                    <Percent className="w-12 h-12 text-green-500" />
                    <p className="text-sm text-center font-medium">
                      Otimização de preços
                    </p>
                  </div>
                </AnimatedIcon>
                <AnimatedIcon>
                  <div className="flex flex-col items-center space-y-2 p-4 bg-white rounded-lg shadow-md">
                    <TrendingUp className="w-12 h-12 text-green-500" />
                    <p className="text-sm text-center font-medium">
                      Aumento da margem de contribuição
                    </p>
                  </div>
                </AnimatedIcon>
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="text-gray-500 md:text-lg">
                Entre as entregas da ferramenta MercaDados estão o fornecimento de
                informações práticas para os compradores tomarem decisões de compras
                e realizarem negociações de forma embasada. Análises de vendas
                simplificadas do mercado e da região, clareza quanto aos custos e
                impostos, análises da composição de carrinhos possibilitando a
                otimização dos preços, balanceando a margem e relevância para atrair
                clientes de cada produto, elevando a margem de contribuição total e
                relevância do mercado na região.
              </p>
            </div>
          </div>
        </section>

        {/* Seção Call to Action */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Pronto para crescer?
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  Junte-se a milhares de empresas que já estão usando a MercaDados
                  para impulsionar seu crescimento e tomar decisões baseadas em
                  dados.
                </p>
              </div>
              <Button className="bg-green-500 text-white hover:bg-green-600">
                Comece sua jornada
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 max-w-7xl mx-auto">
        <p className="text-xs text-gray-500">
          © 2024 MercaDados. Todos os direitos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Termos de Serviço
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacidade
          </Link>
        </nav>
      </footer>
    </div>
  );
}
