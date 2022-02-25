<template>
  <div id="player" ref="player"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { loadScript } from "vue-plugin-load-script";

let player: any; // eslint-disable-line @typescript-eslint/no-explicit-any

export default defineComponent({
  name: "Twitch",
  props: {
    channel: {
      type: String,
      required: true
    },
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    },
    layout: {
      type: String,
      default: 'video-with-chat'
    },
    playsinline: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    channel: {
      immediate: true,
      handler(channel: string) {
        // Check if the player is already loaded
        if (player) {
          player.setChannel(channel);
        }
      }
    }
  },
  beforeCreate() {
    loadScript("https://player.twitch.tv/js/embed/v1.js")
      .then(() => {
        const options = {
          width: this.width,
          height: this.height,
          channel: this.channel,
          layout: this.layout,
          playsinline: this.playsinline,
        };
        player = new (window as any).Twitch.Embed(this.$refs.player, options); // eslint-disable-line @typescript-eslint/no-explicit-any
        player.addEventListener("ended", () => this.$emit("ended"));
        player.addEventListener("pause", () => this.$emit("pause"));
        player.addEventListener("play", () => this.$emit("play"));
        player.addEventListener("offline", () => this.$emit("offline"));
        player.addEventListener("online", () => this.$emit("online"));
        player.addEventListener("ready", () => {
          // player.setQuality(this.quality);
          // player.setVolume(this.volume);
          this.$emit("ready");
        });
      })
      .catch((e) => this.$emit("error", e));
  },
});
</script>

<style scoped>
#player {
  width: 100%;
  height: 100%;
}
</style>