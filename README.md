# Ginita Bakery - Cakes & More 🎂✨

Tienda online profesional, moderna y optimizada para la repostería artesanal dominicana **Ginita Bakery - Cakes & More**. Incluye catálogo de especialidades con navegación directa, sección de picaderas saladas, reestructuración de ponches artesanales por onzas, carrito de compras único global y panel de administración privado para el propietario.

---

## 🚀 Tecnologías Utilizadas

- **Framework:** React 19 + TypeScript (ES2022)
- **Bundler:** Vite 8 (Compilación ultra rápida y estable)
- **Estilos:** Tailwind CSS v4
- **Iconografía:** Lucide React
- **Compatibilidad:** 100% compatible con **Render Static Site** y repositorios de **GitHub**

---

## 📦 Instalación y Ejecución Local

Para ejecutar el proyecto en tu entorno local:

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/ginita-bakery.git
cd ginita-bakery

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Compilar para producción (genera la carpeta dist/)
npm run build

# 5. Previsualizar la compilación de producción localmente
npm run preview
```

---

## 🌐 Despliegue en Render (Render Static Site)

Este proyecto está optimizado y preconfigurado con `render.yaml` y `public/_redirects` para desplegarse como un **Static Site** en Render sin configuraciones manuales complejas:

### Paso a paso:
1. Sube este repositorio a tu cuenta de **GitHub**.
2. Ingresa a [dashboard.render.com](https://dashboard.render.com).
3. Haz clic en **New +** y selecciona **Static Site**.
4. Conecta tu repositorio de GitHub.
5. Configura los siguientes campos (Render los detecta automáticamente):
   - **Name:** `ginita-bakery` (o el nombre que prefieras)
   - **Branch:** `main`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
6. Haz clic en **Create Static Site**.
7. En menos de 2 minutos tu sitio estará en línea con HTTPS gratuito y CDN global.

---

## 🔐 Acceso al Panel de Administración

El panel de administración es **100% privado** y no muestra botones de acceso a los clientes:

- **Enlace de acceso:** En el pie de página (footer) hacer clic en **"Acceso Propietario / Admin"**.
- **Credenciales predeterminadas:**
  - **Usuario:** `ginita` o `admin`
  - **Correo:** `admin@ginitabakery.com`
  - **Contraseña:** `GinitaAdmin2026!`

### Funcionalidades del Administrador:
- Agregar, editar y eliminar productos.
- Activar o desactivar productos (los desactivados se ocultan a los clientes).
- **Calendario de disponibilidad:** Bloquear fechas copadas (el cliente ve *"No disponible"* y no puede agendar).
- Gestión de pedidos en tiempo real (Pendiente, En preparación, Listo, Entregado).
- Exportar listado de pedidos a **Excel / CSV**.
- Gestión de inventario, cupones de descuento, banners y testimonios.

---

## 📁 Estructura del Proyecto

```
├── public/
│   ├── _redirects         # Redirección SPA para Render Static Site
│   └── favicon.svg        # Favicon oficial de Ginita Bakery
├── src/
│   ├── assets/images/     # Fotografías de productos y repostería real
│   ├── components/        # Componentes modulares reutilizables
│   │   ├── AdminLoginModal.tsx
│   │   ├── AdminPanel.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── CatalogSection.tsx
│   │   ├── CheckoutModal.tsx
│   │   ├── CustomCakeBuilder.tsx
│   │   ├── FestiveEffects.tsx
│   │   ├── GinitaLogo.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HolidayCollection.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductDetailModal.tsx
│   │   └── ...
│   ├── context/
│   │   └── BakeryContext.tsx # Estado centralizado (carrito global, pedidos, calendario)
│   ├── data/
│   │   └── initialProducts.ts # Catálogo curado de productos, ponches y salados
│   ├── types/
│   │   └── bakery.ts         # Tipos e interfaces TypeScript
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── render.yaml            # Infraestructura como código para Render
├── tsconfig.json
└── vite.config.ts         # Configuración Vite optimizada para 'dist'
```

---

## 🛡️ Licencia

Derechos reservados © 2026 Ginita Bakery - Cakes & More.
