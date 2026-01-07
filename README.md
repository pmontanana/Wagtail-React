# ReactPR: Arquitectura Headless CMS Moderna

ReactPR es un proyecto full-stack que demuestra una arquitectura moderna y desacoplada, utilizando **Wagtail CMS (Django)** como un potente backend Headless y **React (Vite)** como un frontend de alto rendimiento.

## 🚀 Características Principales

*   **Headless CMS:** La API v2 de Wagtail expone el contenido como JSON.
*   **Frontend Moderno:** Desarrollado con React 19, Vite y TypeScript.
*   **Librería UI:** **shadcn/ui** estilizado con **Tailwind CSS** (v3).
*   **Tematización:** Soporte para modo Claro/Oscuro (Dark/Light mode).
*   **Infraestructura:** Totalmente dockerizado (PostgreSQL, Django, React) para facilitar el desarrollo y despliegue.
*   **Texto Enriquecido:** Integración con Tailwind Typography para renderizar el contenido rico de Wagtail.

## 🛠 Tecnologías (Stack)

### Backend
*   **Lenguaje:** Python 3.12
*   **Framework:** Django 5.2+
*   **CMS:** Wagtail 7.2+
*   **Base de Datos:** PostgreSQL 15
*   **API:** API RESTful (Páginas, Imágenes, Documentos)

### Frontend
*   **Framework:** React 19
*   **Build Tool:** Vite
*   **Lenguaje:** TypeScript
*   **Estilos:** Tailwind CSS, shadcn/ui, Iconos Lucide
*   **Enrutamiento:** React Router DOM

## 🏁 Empezando

### Requisitos Previos
*   Docker y Docker Compose

### Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tuusuario/reactpr.git
    cd reactpr
    ```

2.  **Iniciar el entorno:**
    ```bash
    docker-compose up -d --build
    ```
    Esto construirá las imágenes e iniciará tres contenedores: `db` (Postgres), `web` (Django) y `frontend` (React).

3.  **Cargar Datos de Prueba (Opcional pero Recomendado):**
    Puebla la base de datos con una página de Inicio y artículos de Blog de ejemplo.
    ```bash
    docker-compose exec web python manage.py seed
    ```

4.  **Crear un Superusuario (Admin):**
    ```bash
    docker-compose exec web python manage.py createsuperuser
    ```

### Puntos de Acceso

| Servicio | URL | Credenciales |
| :--- | :--- | :--- |
| **Frontend** | [http://localhost:5173](http://localhost:5173) | N/A |
| **Backend API** | [http://localhost:8000/api/v2/](http://localhost:8000/api/v2/) | N/A |
| **CMS Admin** | [http://localhost:8000/admin](http://localhost:8000/admin) | Usuario creado en el paso 4 |

## 📦 Estructura del Proyecto

```
reactpr/
├── docker-compose.yml   # Orquestación de servicios
├── Dockerfile           # Definición de imagen Backend
├── pyproject.toml       # Dependencias de Python
├── requirements_docker.txt # Dependencias congeladas para caché Docker
├── home/                # App Django principal (Modelos, Seeds)
├── reactpr/             # Configuración del proyecto Django y API
└── frontend/            # Aplicación React
    ├── src/
    │   ├── components/  # Componentes UI y Layout
    │   ├── pages/       # Vistas de rutas (Home, Blog, Login)
    │   └── ...
    └── vite.config.ts   # Configuración de Vite
```

## 🔧 Flujo de Trabajo

*   **Frontend:** La carpeta `frontend` está montada en el contenedor. Los cambios en archivos React (`.tsx`, `.css`) activan la recarga instantánea (Hot-reload).
*   **Backend:** La raíz del proyecto está montada. Los cambios en archivos Python reinician automáticamente el servidor Django.
*   **Instalar Paquetes Frontend:**
    ```bash
    docker-compose exec frontend npm install [nombre-paquete]
    ```
*   **Añadir componentes shadcn/ui:**
    ```bash
    docker-compose exec frontend npx shadcn@latest add [nombre-componente]
    ```

## 📄 Licencia

Este proyecto está licenciado bajo la GNU General Public License v3.0 - ver el archivo [LICENSE](LICENSE) para más detalles.