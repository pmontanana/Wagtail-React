import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { ArrowLeft, CalendarDays } from "lucide-react"
import { API_URL } from "@/lib/config"

interface BlogPostData {
  id: number;
  title: string;
  intro: string;
  body: string;
  date: string;
}

export function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/v2/pages/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data: BlogPostData) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="h-8 w-32 bg-muted rounded mb-4 animate-pulse"></div>
        <div className="h-12 w-3/4 bg-muted rounded mb-4 animate-pulse"></div>
        <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Artículo no encontrado</h1>
        <Link to="/blog">
          <Button>Volver al Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Link to="/blog">
        <Button variant="ghost" className="pl-0 hover:pl-0 hover:bg-transparent text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Blog
        </Button>
      </Link>

      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-5 w-5" />
            <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
        </div>
        <p className="text-xl text-muted-foreground mt-6 leading-relaxed">
            {post.intro}
        </p>
      </header>

      {/* Renderizado de RichText */}
      <div 
        className="prose dark:prose-invert prose-lg max-w-none prose-indigo prose-headings:font-bold prose-a:text-indigo-600"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </article>
  )
}
