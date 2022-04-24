<template>
  <v-app-bar density="compact" absolute>
    <v-app-bar-title><h1>GoTwitch</h1></v-app-bar-title>

    <v-spacer></v-spacer>

    <v-divider inset vertical></v-divider>

    <v-btn
      @click="onGoButtonClick"
      class="ml-5 mr-0"
      color="primary"
      rounded="0"
      variant="contained"
    >
      <v-icon left icon="mdi-cached"></v-icon>

      <span>GO!</span>
    </v-btn>
    <v-btn
      @click="onFilterButtonClick"
      class="ml-0 mr-4 px-2"
      color="primary"
      rounded="0"
      variant="outlined"
      min-width="0"
      aria-label="Filter"
    >
      <v-badge v-if="filterCount" :content="filterCount">
        <v-icon icon="mdi-filter"></v-icon>
      </v-badge>
      <v-icon v-else icon="mdi-filter"></v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { FilterContextKey } from "@/context/FilterContext";
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "AppBar",
  props: {
    onGoButtonClick: {
      type: Function,
      default: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
    },
    onFilterButtonClick: {
      type: Function,
      default: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
    },
  },
  setup() {
    const {
      filterCount
    } = inject(FilterContextKey)
    return {
      filterCount
    }
  },
});
</script>
