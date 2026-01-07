from django.core.management.base import BaseCommand
from home.models import HomePage, BlogPage
from wagtail.models import Page
import datetime

class Command(BaseCommand):
    help = 'Seeds the database with initial content'

    def handle(self, *args, **options):
        self.stdout.write("Seeding content...")

        # 1. Update HomePage
        homepage = HomePage.objects.first()
        if homepage:
            homepage.body = """
            <p>Bienvenido a <b>ReactPR</b>.</p>
            <p>Esta es una demostración de una arquitectura <i>Headless</i> utilizando:</p>
            <ul>
                <li>Wagtail CMS (Backend)</li>
                <li>React + Vite (Frontend)</li>
                <li>Tailwind CSS + Shadcn UI (Estilos)</li>
            </ul>
            """
            homepage.save_revision().publish()
            self.stdout.write(self.style.SUCCESS('HomePage updated.'))
        else:
            self.stdout.write(self.style.WARNING('HomePage not found. Please create one in admin first (or run standard migrations).'))

        # 2. Create Blog Pages
        blog_posts = [
            {
                "title": "El Futuro del Desarrollo Web",
                "intro": "Analizamos las tendencias de arquitecturas desacopladas.",
                "date": datetime.date(2025, 1, 15),
                "body": "<p>Las arquitecturas headless permiten una flexibilidad total...</p>"
            },
            {
                "title": "Wagtail v6: Novedades",
                "intro": "Todo lo que necesitas saber sobre la última versión.",
                "date": datetime.date(2025, 2, 20),
                "body": "<p>Wagtail sigue mejorando su editor y su API...</p>"
            },
            {
                "title": "React 19 y el Compilador",
                "intro": "Cómo React Forget cambiará la forma en que optimizamos.",
                "date": datetime.date(2025, 3, 10),
                "body": "<p>Olvídate de useMemo y useCallback...</p>"
            },
            {
                "title": "Docker para Principiantes",
                "intro": "Guía rápida para contenerizar tus aplicaciones.",
                "date": datetime.date(2025, 4, 5),
                "body": "<p>Docker simplifica el despliegue y el desarrollo local...</p>"
            }
        ]

        if homepage:
            for post in blog_posts:
                # Check if page already exists to prevent duplication and tree corruption
                if not BlogPage.objects.child_of(homepage).filter(title=post["title"]).exists():
                    page = BlogPage(
                        title=post["title"],
                        intro=post["intro"],
                        date=post["date"],
                        body=post["body"]
                    )
                    homepage.add_child(instance=page)
                    page.save_revision().publish()
                    self.stdout.write(f'Created: {post["title"]}')
                else:
                    self.stdout.write(f'Skipped (exists): {post["title"]}')
            
            self.stdout.write(self.style.SUCCESS('Seeding complete!'))
