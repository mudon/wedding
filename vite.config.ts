import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/wedding/',
  plugins: [react()],
   server: {
    host: true, // or '0.0.0.0'
    port: 3000, // Ensure this is the correct port
  }
})
