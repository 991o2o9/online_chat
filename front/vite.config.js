import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      Utils: '/src/Utils',
      Modules: '/src/Modules',
      Pages: '/src/Pages',
      Ui: '/src/Ui',
      mixins: '/src/App/Styles/mixins.scss',
    },
  },
});
