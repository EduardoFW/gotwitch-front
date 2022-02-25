<template>
  <v-layout full-height>
    <v-app full-height>
      <AppBar />
      <v-main>
        <v-layout full-height>
          <Twitch channel="monstercat" />
        </v-layout>
      </v-main>
    </v-app>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Twitch from "./components/Twitch.vue";
import AppBar from "./components/AppBar.vue";

export default defineComponent({
  name: "App",

  components: {
    Twitch,
    AppBar,
  },

  data() {
    return {
      //
    };
  },
});
</script>
