<template>
  <v-layout full-height>
    <v-dialog
      v-model="filterModal"
    >
      <div class="d-flex align-center flex-column">
        <FilterDialog @onCloseClick="() => filterModal = false" @onApplyFilterClick="applyFilter"/>
      </div>
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
    getFiltersParams() {
      const {
        language,
        gameId,
      } = this.filter;

      return {
        language: language.map((l) => l.code),
        gameId: gameId.map((c) => c.id),
      };
    },
    applyFilter(params: getRandomStreamParams) {
      this.randomizeChannel();
      this.filterModal = false;
    },
    randomizeChannel() {
      this.loading = true;
      getRandomStream(this.getFiltersParams())
        .then((response) => {
          this.channel = response.stream.user_login;
        })
        .catch((e) => console.error(e))
        .finally(() => (this.loading = false));
    },
  },
});
</script>
