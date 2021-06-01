import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(Vuelidate)
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
