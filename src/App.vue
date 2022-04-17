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
import { defineComponent, provide } from "vue";
import { getRandomStream, getRandomStreamParams } from "./services/api";
import Twitch from "./components/Twitch.vue";
import AppBar from "./components/AppBar.vue";
import Loading from "./components/Loading.vue";
import Footer from "./components/Footer.vue";
import FilterDialog from "./components/FilterDialog.vue";
import FilterContext, { FilterContextKey } from "./context/FilterContext";

export default defineComponent({
  name: "App",

  components: {
    Twitch,
    AppBar,
    Loading,
    Footer,
    FilterDialog
  },
  setup () {
    provide(FilterContextKey, FilterContext);

    return {
      ...FilterContext,
    }
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
    applyFilter(params: getRandomStreamParams) {
      console.log(params);
      this.randomizeChannel();
      this.filterModal = false;
    },
    randomizeChannel() {
      this.loading = true;
      getRandomStream(this.filter)
        .then((stream) => {
          this.channel = stream.data.user_login;
        })
        .catch((e) => console.error(e))
        .finally(() => (this.loading = false));
    },
  },
});
</script>
