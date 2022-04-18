<template>
  <v-card width="500px">
    <v-card-title>
      <span>Filters</span>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-autocomplete
            v-model="selectedLanguages"
            :items="languageNames"
            outlined
            chips
            closable-chips
            label="Languages"
            multiple
          ></v-autocomplete>
          <v-autocomplete
            v-model="selectedCategory"
            v-model:search="searchCategory"
            :items="categoryNames"
            outlined
            chips
            closable-chips
            no-filter
            label="Categories"
            multiple
          ></v-autocomplete>
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
import { cloneDeep } from "lodash";
import { defineComponent, inject, ref, watch } from "vue";
import { FilterContextKey } from "../context/FilterContext";

interface ILanguageType {
  code: string;
  name: string;
}

export interface IFilterReturn {
  language: string[];
}

export default defineComponent({
  name: "FilterDialog",
  components: {},
  emits: ["onCloseClick", "onApplyFilterClick"],
  setup() {
    const { filter } = inject(FilterContextKey);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const languages = require("../mock/languages.json") as ILanguageType[];

    const getSelectedLanguagesFromCode = (languagesCodes: string[]) => {
      return languages
        .filter((language) => languagesCodes.includes(language.code))
        .map((language) => language.name);
    };
    const selectedLanguages = ref(
      getSelectedLanguagesFromCode(filter.language)
    );

    const selectedCategory = ref<string[]>([]);
    const selectedCategoryId = ref<string[]>([]);
    const categories = ref<Category[]>([]);
    const searchCategory = ref();

    watch(() => cloneDeep(selectedCategory.value), (newValue) => {
      selectedCategoryId.value = categories.value.filter(
        (category) => newValue.includes(category.name)
      ).map((category) => category.id);
    });

    return {
      filter,
      languages,
      categories,
      selectedLanguages,
      selectedCategory,
      selectedCategoryId,
      searchCategory,
    };
  },
  computed: {
    languageNames: function () {
      return this.languages.map((language: ILanguageType) => language.name);
    },
    categoryNames: function () {
      const allCategories = this.selectedCategory.concat(this.categories.map((category) => category.name));
      return [...new Set(allCategories)];
    },
  },
  mounted() {
    console.log(this.filter);
  },
  watch: {
    searchCategory(val: string) {
      if (val.length > 2) {
        searchCategory(val).then((response: SearchCategoryReturn) => {
          this.categories = response.data;
        });
      }
    },
  },
  methods: {
    getLanguageCodes: function (languageNames: string[]): string[] {
      return this.languages
        .filter((language: ILanguageType) =>
          languageNames.includes(language.name)
        )
        .map((language: ILanguageType) => language.code);
    },
    onApplyFilterClick: function () {
      // Get language codes
      const languageCodes = this.getLanguageCodes(this.selectedLanguages);
      const categoryCodes = this.selectedCategoryId;
      console.log(categoryCodes);
      // Set filter
      this.filter.language = languageCodes;

      this.$emit("onApplyFilterClick", this.filter);
    },
  },
  props: {},
});
</script>
