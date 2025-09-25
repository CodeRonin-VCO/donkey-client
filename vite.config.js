import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige tout ce qui commence par /api vers ton backend sur localhost:8007
      '/api': {
        target: 'http://localhost:8007',
        changeOrigin: true,
        secure: false,
      },
      // Si tu as besoin, tu peux aussi proxy les sockets (optionnel)
      '/socket.io': {
        target: 'http://localhost:8007',
        ws: true,  // WebSocket proxy
      },
    },
  },
})
