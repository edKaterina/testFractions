<template>
  <v-app>
    <v-main>
      <v-container>
        <fraction-form />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import FractionForm from './components/FractionForm'

export default {
  name: 'App',

  components: {
    FractionForm
  },

  data: () => ({
    //
  })
}
</script>
