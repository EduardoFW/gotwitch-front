<template>
  <v-autocomplete
    v-model="selected"
    v-model:search="localSearch"
    :items="itemTexts"
    :label="label"
    :multiple="multiple"
    :chips="chips"
    :closable-chips="closableChips"
    :no-filter="noFilter"
    :outlined="outlined"
    @update:search="(value) => $emit('update:search', value)"
  ></v-autocomplete>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, defineComponent, ref, watch } from "@vue/runtime-core";
import { cloneDeep } from "lodash";

export default defineComponent({
  name: "Autocomplete",
  inheritAttrs: false,
  emits: ["update:modelValue", "update:search"],
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    search: {
      type: String,
      default: "",
    },
    itemText: {
      type: String,
      default: "text",
    },
    itemValue: {
      type: String,
      default: "value",
    },
    label: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    chips: {
      type: Boolean,
      default: false,
    },
    closableChips: {
      type: Boolean,
      default: false,
    },
    noFilter: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const getNameFromObject = (object: any) => {
      const item: any = props.items.find((item: any) => item[props.itemValue] === object[props.itemValue]);
      return item ? item[props.itemText] : "";
    };

    const getItemFromName = (name: string) => {
      const item: any = props.items.find((item: any) => item[props.itemText] === name);
      return item;
    };

    const selected = ref<string[]>((props.modelValue as string[]).map((value) => getNameFromObject(value)));
    const localSearch = ref<string>("");

    const itemTexts = computed(() =>
      props.items.map((item: any) => item[props.itemText])
    );

    watch(
      () => cloneDeep(selected.value),
      () => {
        const values = selected.value.map((name: string) => getItemFromName(name));
        emit("update:modelValue", values);
      },
    );

    return {
      selected,
      localSearch,
      itemTexts,
    };
  },
  mounted() {
    // console.log(VAutocomplete);
  },
});
</script>