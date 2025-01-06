import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      utils: '/src/Utils',
      modules: '/src/Modules',
      pages: '/src/Pages',
      ui: '/src/Ui',
      mixins: '/src/App/Styles/mixins.scss',
    },
  },
});
