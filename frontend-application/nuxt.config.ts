export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap-vue-3/dist/bootstrap-vue-3.css'
  ],
  plugins: [
    { src: './plugins/bootstrap-vue-3.js', mode: 'client' }
  ]
});
