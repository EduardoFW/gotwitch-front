<template>
  <v-overlay :model-value="true" class="align-center justify-center" contained>
    <v-progress-circular indeterminate size="100" width="8" :color="color" />
  </v-overlay>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loading",
  props: {
    color: {
      type: String,
      default: "primary",
    }
  },
});
</script>
