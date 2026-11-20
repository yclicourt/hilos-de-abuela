import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Tienda estática: sin backend, sin base de datos.
// El catálogo vive en src/data/products.js y el pedido sale por WhatsApp.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
