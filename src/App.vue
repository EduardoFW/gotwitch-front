<template>
  <v-layout full-height>
    <v-dialog
      v-model="filterModal"
    >
      <FilterDialog @onCloseClick="() => filterModal = false" @onApplyFilterClick="applyFilter"/>
    </v-dialog>
    <v-app full-height>
      <AppBar :onGoButtonClick="randomizeChannel" :onFilterButtonClick="() => filterModal = true" />
      <v-main>
        <v-layout full-height>
          <Loading v-if="loading" />
          <Twitch v-if="channel" :channel="channel" />
        </v-layout>
      </v-main>
      <Footer />
    </v-app>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getRandomStream } from "./services/api";
import Twitch from "./components/Twitch.vue";
import AppBar from "./components/AppBar.vue";
import Loading from "./components/Loading.vue";
import Footer from "./components/Footer.vue";
import FilterDialog from "./components/FilterDialog.vue";

export default defineComponent({
  name: "App",

  components: {
    Twitch,
    AppBar,
    Loading,
    Footer,
    FilterDialog,
  },
  created() {
    this.randomizeChannel();
  },
  data() {
    return {
      channel: "",
      loading: false,
      filterModal: false,
    };
  },
  methods: {
    applyFilter(params: any) {
      console.log(params);
      this.randomizeChannel(params);
      this.filterModal = false;
    },
    randomizeChannel(params?: any) {
      this.loading = true;
      getRandomStream(params)
        .then((stream) => {
          this.channel = stream.data.user_login;
        })
        .catch((e) => console.error(e))
        .finally(() => (this.loading = false));
    },
  },
});
</script>
