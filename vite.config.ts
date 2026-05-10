import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/aperture-simulator-v2/',
  plugins: [react()],
})
