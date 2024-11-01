import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})
app.use(vuetify);

const head = createHead()
app.use(head)

app.mount('#app')
