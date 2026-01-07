#!/usr/bin/env bash
# exit on error
set -o errexit

# Instalar dependencias desde pyproject.toml
pip install .

# Recopilar estáticos
python manage.py collectstatic --no-input

# Migrar base de datos
python manage.py migrate

# Reparar árbol de Wagtail (por si acaso)
python manage.py fixtree

# Poblar datos iniciales (Seed)
python manage.py seed
