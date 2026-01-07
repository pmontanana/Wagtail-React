import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, CalendarDays } from "lucide-react"

interface BlogPage {
  id: number;
  title: string;
  intro: string;
  date: string;
}

interface WagtailResponse {
  items: BlogPage[];
  meta: {
    total_count: number;
  };
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/v2/pages/?type=home.BlogPage&fields=intro,date&order=-date')
      .then((res) => res.ok ? res.json() : { items: [] })
      .then((data: WagtailResponse) => {
        setPosts(data.items);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12 text-center space-y-4">
        <Badge variant="secondary" className="mb-4">Nuestro Blog</Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
          Noticias y Artículos
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Descubre las últimas tendencias en desarrollo web, Wagtail y React.
        </p>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 bg-muted rounded-xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-muted bg-card group">
              {/* Imagen Placeholder (Simulada con gradiente) */}
              <div className="h-48 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center border-b border-border group-hover:scale-105 transition-transform duration-500">
                <span className="text-4xl opacity-20">🖼️</span>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start gap-4 mb-2">
                  <Badge variant="outline" className="font-normal">
                    Artículo
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </time>
                  </div>
                </div>
                <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                  <Link to={`/blog/${post.id}`} className="hover:underline decoration-2 underline-offset-4">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <CardDescription className="text-base line-clamp-3">
                  {post.intro}
                </CardDescription>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button asChild variant="ghost" className="w-full justify-between group/btn hover:bg-primary/5 hover:text-primary">
                  <Link to={`/blog/${post.id}`}>
                    Leer artículo
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {!loading && posts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No hay artículos publicados aún.</p>
        </div>
      )}
    </div>
  )
}