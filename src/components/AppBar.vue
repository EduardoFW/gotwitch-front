<template>
  <v-app-bar density="compact" absolute>
    <v-app-bar-title>TwitchGo</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-divider inset vertical></v-divider>

    <v-btn class="mr-4 ml-5" color="primary" plain>
      <v-icon left icon="mdi-cached"></v-icon>

      <span>GO!</span>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppBar",
});
</script>
