import { defineConfig } from '#q-app'

export default defineConfig(() => {
  return {
    boot: ['erros'],

    extras: ['roboto-font', 'material-icons'],

    build: {
      vueRouterMode: 'history'
    },

    devServer: {
      port: 5173,
      open: false,
      proxy: {
        '/api': {
          target: process.env.API_URL ?? 'http://localhost:3000',
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },

    framework: {
      config: {
        brand: {
          primary: '#4f5bd5',
          secondary: '#64748b',
          positive: '#16a34a',
          negative: '#dc2626',
          warning: '#f59e0b'
        }
      },
      plugins: ['Dialog', 'Notify']
    }
  }
})
