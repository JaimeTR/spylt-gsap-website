# Jaime Tarazona — Portafolio de Proyectos

Portafolio web premium de **Jaime Tarazona**, Full Stack Developer, WordPress Expert y AI Automation Specialist. Galería interactiva de proyectos con panel de administración integrado.

---

## Tecnologías

- **Framework:** Next.js 15 (App Router)
- **Estilos:** Tailwind CSS 4
- **Animaciones:** Framer Motion, GSAP, tsparticles
- **Iconos:** Lucide React, React Icons
- **Lenguaje:** TypeScript

---

## Funcionalidades

- Pantalla de bienvenida animada con transiciones fluidas
- Galería de proyectos con filtrado por categorías
- Visualizador de proyectos con iframe o apertura externa
- Panel de administración (`/admin`) con CRUD de proyectos
- API para carga de imágenes y gestión de proyectos
- Fondo interactivo de partículas
- Contador animado de estadísticas
- Sección de contacto con enlaces sociales
- Totalmente responsive y mobile-friendly

---

## Deployment

Configurado con `output: "standalone"` para deploy en Node.js (Hostinger, VPS, etc.).

```bash
npm run build
# El output estara en .next/standalone/
```

Para correr en produccion:
```bash
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
cd .next/standalone && node server.js
```

---

## Desarrollo Local

```bash
git clone https://github.com/JaimeTR/portafoliodeproyectos.jaimetr.dev
cd portafoliodeproyectos.jaimetr.dev
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

---

## Live Demo

[portafoliodeproyectos.jaimetr.dev](https://portafoliodeproyectos.jaimetr.dev)
