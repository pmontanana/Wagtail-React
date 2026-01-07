# Use an official Python runtime based on Debian 12 "bookworm" as a parent image.
FROM python:3.12-slim-bookworm

# Add user that will be used in the container.
RUN useradd -m wagtail

# Port used by this container to serve HTTP.
EXPOSE 8000

# Set environment variables.
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8000

# Install system packages and Node.js in a single layer to optimize size.
# We remove libmariadb-dev as we use Postgres.
RUN apt-get update --yes --quiet && apt-get install --yes --quiet --no-install-recommends \
    build-essential \
    libpq-dev \
    libjpeg62-turbo-dev \
    zlib1g-dev \
    libwebp-dev \
    curl \
    gnupg \
    ca-certificates \
 && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
 && apt-get install --yes --quiet --no-install-recommends nodejs \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install the application server.
RUN pip install "gunicorn==20.0.4"

# Install dependencies first to leverage Docker cache.
COPY requirements_docker.txt /
RUN pip install --no-cache-dir -r /requirements_docker.txt

# Use /app folder as a directory where the source code is stored.
WORKDIR /app

# Set ownership for the wagtail user
RUN chown wagtail:wagtail /app

# Copy the source code of the project into the container.
COPY --chown=wagtail:wagtail . .

# Install the project itself (without reinstalling dependencies).
RUN pip install --no-deps .

# Switch to non-root user
USER wagtail

# Build Tailwind CSS
# We clean existing node_modules to ensure Linux-compatible binaries are installed
RUN rm -rf theme/static_src/node_modules \
 && python manage.py tailwind install \
 && python manage.py tailwind build

# Collect static files.
RUN python manage.py collectstatic --noinput --clear

# Runtime command
CMD set -xe; python manage.py migrate --noinput; gunicorn reactpr.wsgi:application