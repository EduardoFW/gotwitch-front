<template>
  <v-layout full-height>
    <v-app full-height>
      <AppBar :onGoButtonClick="randomizeChannel" />
      <v-main>
        <v-layout full-height>
          <Twitch v-if="channel" :channel="channel" />
          <Loading v-else-if="loading" />
        </v-layout>
      </v-main>
    </v-app>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getRandomStream } from "./services/api";
import Twitch from "./components/Twitch.vue";
import AppBar from "./components/AppBar.vue";
import Loading from "./components/Loading.vue";

export default defineComponent({
  name: "App",

  components: {
    Twitch,
    AppBar,
    Loading,
  },
  mounted() {
    this.randomizeChannel();
  },
  data() {
    return {
      channel: "",
      loading: false,
    };
  },
  methods: {
    randomizeChannel() {
      this.loading = true;
      getRandomStream()
        .then((stream) => {
          this.channel = stream.data.user_login;
        })
        .catch((e) => console.error(e))
        .finally(() => (this.loading = false));
    },
  },
});
</script>
