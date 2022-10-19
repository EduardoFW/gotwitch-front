<template>
  <v-card width="500px">
    <v-card-title>
      <span>Filters</span>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <Autocomplete
            v-model="selectedLanguages"
            outlined
            chips
            closable-chips
            label="Languages"
            multiple
            :items="languages"
            item-text="name"
            item-value="code"
            :max-items="10"
          />
          <Autocomplete
            v-model="selectedCategories"
            v-model:search="searchCategoryInput"
            outlined
            chips
            closable-chips
            label="Categories"
            multiple
            :items="categories"
            item-text="name"
            item-value="id"
            :max-items="10"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="error" @click="$emit('onCloseClick')">Cancel</v-btn>
      <v-spacer />
      <v-btn color="primary" @click="onApplyFilterClick">Apply</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Category, searchCategory, SearchCategoryReturn } from "@/services/api";
import { defineComponent, inject, ref } from "vue";
import { FilterContextKey, FilterGame } from "../context/FilterContext";
import Autocomplete from "./Autocomplete.vue";

interface ILanguageType {
  code: string;
  name: string;
}

export interface IFilterReturn {
  language: string[];
}

export default defineComponent({
  name: "FilterDialog",
  components: {
    Autocomplete,
  },
  emits: ["onCloseClick", "onApplyFilterClick"],
  setup() {
    const { filter } = inject(FilterContextKey);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const languages = require("../mock/languages.json") as ILanguageType[];
    const selectedLanguages = ref(filter.language);

    const selectedCategories = ref<FilterGame[]>(filter.gameId);
    const categories = ref<Category[]>([]);
    const searchCategoryInput = ref();


    return {
      filter,
      languages,
      categories,
      selectedLanguages,
      selectedCategories,
      searchCategoryInput,
    };
  },
  computed: {
    allCategories: function () {
      return this.categories;
    },
    allLanguages: function () {
      return this.languages;
    },
  },
  watch: {
    searchCategoryInput(searchInput: string) {
      if (searchInput.length > 2) {
        searchCategory(searchInput).then((response: SearchCategoryReturn) => {
          this.categories = response.categories;
        });
      }
    },
  },
  methods: {
    concatWithoutDuplicates<T>(array1: T[], array2: T[]): T[] {
      return array1.concat(
        array2.filter((item) => array1.indexOf(item) < 0)
      );
    },
    onApplyFilterClick: function () {
      // Get language codes
      const languageCodes = this.selectedLanguages;
      const categoryCodes = this.selectedCategories;

      // Set filter
      this.filter.language = languageCodes;
      this.filter.gameId = categoryCodes;

      this.$emit("onApplyFilterClick", this.filter);
    },
  },
  props: {},
});
</script>
