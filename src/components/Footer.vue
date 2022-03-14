<template>
  <div class="bg-primary d-flex w-100 align-center px-1 justify-center">
    <strong>GoTwitch - 2022</strong>
    <!-- <v-spacer></v-spacer> -->
    <v-btn
      class="mx-4 text-white"
      icon="mdi-github"
      variant="plain"
      size="small"
      href="https://github.com/EduardoFW/gotwitch-front"
      target="_blank"
    ></v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>
