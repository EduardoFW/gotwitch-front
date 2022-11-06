<template>
  <v-card width="500px">
    <v-card-title>
      <span>Filters</span>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <Autocomplete v-model="selectedLanguages" outlined chips closable-chips label="Languages" multiple
            :items="languages" item-text="name" item-value="code" :max-items="10" />
          <Autocomplete v-model="selectedCategories" v-model:search="searchCategoryInput" outlined chips closable-chips
            label="Categories" multiple :items="allCategories" item-text="name" item-value="id" :max-items="10" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="error" @click="$emit('onCloseClick')">Cancel</v-btn>
      <v-spacer />
      <v-btn color="primary" @click="onApplyFilterClick" :loading="possibleStreamsCountLoading"
        :disabled="possibleStreamsCount == 0">
        Apply ({{ possibleStreamsCount }})
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Category, searchCategory, SearchCategoryReturn, getPossibleStreamsCount } from "@/services/api";
import { defineComponent, inject, Ref, ref, watch } from "vue";
import { FilterContextKey, FilterGame, FilterLanguage } from "../context/FilterContext";
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
    const { filter, getFilterParams } = inject(FilterContextKey);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const languages = require("../mock/languages.json") as ILanguageType[];
    const selectedLanguages: Ref<FilterLanguage[]> = ref(filter.language);

    const initiallyExistingCategories: Category[] = filter.gameId.map(
      (gameId: FilterGame) => ({
        id: gameId.id,
        name: gameId.name,
      })
    );

    const categories = ref<Category[]>(initiallyExistingCategories);
    const selectedCategories = ref<FilterGame[]>(filter.gameId);

    const searchCategoryInput = ref();

    const possibleStreamsCount = ref(0);
    const possibleStreamsCountLoading = ref(false);

    const updatePossibleStreamsCount = () => {
      possibleStreamsCountLoading.value = true;
      getPossibleStreamsCount(
        getFilterParams({
          language: selectedLanguages.value,
          gameId: selectedCategories.value,
        })
      ).then((count) => {
        possibleStreamsCount.value = count;
      }).finally(() => {
        possibleStreamsCountLoading.value = false;
      });
    };

    updatePossibleStreamsCount();
    watch(
      () => selectedLanguages.value.length + selectedCategories.value.length,
      () => {
        updatePossibleStreamsCount();
      }
    );

    return {
      filter,
      languages,
      categories,
      selectedLanguages,
      selectedCategories,
      searchCategoryInput,
      initiallyExistingCategories,
      possibleStreamsCount,
      possibleStreamsCountLoading,
    };
  },
  computed: {
    allCategories() {
      return this.concatCategoriesWithoutDuplicateIDs(
        this.categories,
        this.initiallyExistingCategories
      );
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
    concatCategoriesWithoutDuplicateIDs: function (
      categories: Category[],
      newCategories: Category[]
    ) {
      const newCategoriesWithoutDuplicates = newCategories.filter(
        (newCategory) => {
          return !categories.some(
            (category) => category.id === newCategory.id
          );
        }
      );
      return categories.concat(newCategoriesWithoutDuplicates);
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
