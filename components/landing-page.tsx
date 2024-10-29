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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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
      // Adicionamos verificações para garantir que 'ctx' e 'canvas' não são nulos
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
      if (!canvas) return; // Verifica se 'canvas' não é nulo antes de usá-lo
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black relative overflow-hidden">
          <AnimatedBits />
          <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center mx-auto">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
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
        {/* ... Outras seções do seu código ... */}
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 max-w-7xl mx-auto">
        <p className="text-xs text-gray-500">
          © 2024 MercaDados. Todos os direitos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="#"
          >
            Termos de Serviço
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="#"
          >
            Privacidade
          </Link>
        </nav>
      </footer>
    </div>
  );
}
