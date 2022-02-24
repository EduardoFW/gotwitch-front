<template>
  <v-app>
    <AppBar />
    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import AppBar from './components/AppBar.vue'

export default defineComponent({
  name: 'App',

  components: {
    HelloWorld,
    AppBar,
  },

  data () {
    return {
      //
    }
  },
})
</script>
