<template>
  <v-layout full-height>
    <v-app full-height>
      <AppBar :onGoButtonClick="randomizeChannel" />
      <v-main>
        <v-layout full-height>
          <Twitch v-if="channel" :channel="channel" />
        </v-layout>
      </v-main>
    </v-app>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getRandomStream } from './services/api';
import Twitch from "./components/Twitch.vue";
import AppBar from "./components/AppBar.vue";

export default defineComponent({
  name: "App",

  components: {
    Twitch,
    AppBar,
  },
  mounted() {
    this.randomizeChannel();
  },
  data() {
    return {
      channel: "",
    };
  },
  methods: {
    randomizeChannel() {
      console.log('Running randomizeChannel');
      getRandomStream()
        .then((stream) => {
          this.channel = stream.data.user_login;
        })
        .catch((e) => console.error(e));
    },
  },
});
</script>
