import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, LayoutTemplate, Database } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface WagtailPage {
  id: number;
  title: string;
  body: string;
  meta: {
    type: string;
    detail_url: string;
    html_url: string;
  };
}

interface WagtailResponse {
  items: WagtailPage[];
}

export function Home() {
  const [pages, setPages] = useState<WagtailPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/v2/pages/?type=home.HomePage&fields=body')
      .then((res) => res.ok ? res.json() : { items: [] })
      .then((data: WagtailResponse) => {
        setPages(data.items);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary mb-6">
            Construye el futuro con <span className="text-indigo-600 dark:text-indigo-400">React & Wagtail</span>
          </h1>
          {pages.length > 0 && pages[0].body && (
             <div 
               className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto prose dark:prose-invert"
               dangerouslySetInnerHTML={{ __html: pages[0].body }} 
             />
          )}
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="gap-2">
              Empezar ahora <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Documentación
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<LayoutTemplate className="h-10 w-10 text-indigo-500" />}
              title="Frontend Moderno"
              description="Desarrollado con React, TypeScript, Vite y Tailwind CSS para una experiencia de usuario fluida."
            />
            <FeatureCard 
              icon={<Database className="h-10 w-10 text-emerald-500" />}
              title="Backend Robusto"
              description="Gestionado por Wagtail CMS y Django, ofreciendo una API potente y flexible."
            />
            <FeatureCard 
              icon={<CheckCircle2 className="h-10 w-10 text-blue-500" />}
              title="Componentes UI"
              description="Interfaz construida con shadcn/ui, totalmente accesible y personalizable."
            />
          </div>
        </div>
      </section>

      {/* Backend Status Section (Mini integration check) */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <h3 className="text-lg font-semibold mb-4">Integración CMS</h3>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border shadow-sm">
            <span className={`h-3 w-3 rounded-full ${loading ? 'bg-yellow-400' : (pages.length > 0 ? 'bg-green-500' : 'bg-red-500')}`}></span>
            <span className="text-sm font-medium">
              {loading ? 'Conectando con Wagtail...' : (pages.length > 0 ? `Conectado: ${pages.length} página(s) encontradas` : 'Sin conexión con Backend')}
            </span>
          </div>
        </div>
      </section>

    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-none shadow-none bg-muted/10 hover:bg-muted/30 transition-colors">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
