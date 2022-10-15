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
          />
          <Autocomplete
            v-model="selectedCategory"
            v-model:search="searchCategory"
            outlined
            chips
            closable-chips
            label="Categories"
            multiple
            :items="allCategories"
            item-text="name"
            item-value="id"
          />
          <!-- <Autocomplete
            v-model="selectedCat"
            v-model:search="searchCat"
            label="Categories 2"
            :items="languages"
            item-text="name"
            multiple
            item-value="code"
          /> -->
          <!-- <v-autocomplete
            v-model="selectedCategory"
            v-model:search="searchCategory"
            :items="categoryNames"
            outlined
            chips
            closable-chips
            no-filter
            label="Categories"
            multiple
          ></v-autocomplete> -->
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

    const selectedCategory = ref<FilterGame[]>(filter.gameId);
    const categories = ref<Category[]>([]);
    const searchCategory = ref();


    return {
      filter,
      languages,
      categories,
      selectedLanguages,
      selectedCategory,
      searchCategory,
    };
  },
  computed: {
    allCategories: function () {
      return this.selectedCategory.concat(this.categories);
    },
  },
  watch: {
    searchCategory(val: string) {
      if (val.length > 2) {
        searchCategory(val).then((response: SearchCategoryReturn) => {
          this.categories = response.categories;
        });
      }
    },
  },
  methods: {
    onApplyFilterClick: function () {
      // Get language codes
      const languageCodes = this.selectedLanguages;
      const categoryCodes = this.selectedCategory;

      // Set filter
      this.filter.language = languageCodes;
      this.filter.gameId = categoryCodes;

      this.$emit("onApplyFilterClick", this.filter);
    },
  },
  props: {},
});
</script>
