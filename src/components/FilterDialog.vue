<template>
  <v-card width="500px">
    <v-card-title>
      <span>Filters</span>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-autocomplete
            v-model="filter.language"
            :items="languageNames"
            outlined
            chips
            closable-chips
            label="Languages"
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
import { getRandomStreamParams } from "@/services/api";
import { defineComponent, inject } from "vue";
import { FilterContextKey } from '../context/FilterContext';

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
    return {
      filter
    }
  },
  data() {
    return {
      languages: require("../mock/languages.json"),
    };
  },
  computed: {
    languageNames: function () {
      return this.languages.map((language: ILanguageType) => language.name);
    },
  },
  mounted() {
    console.log(this.filter);
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
      const filter: getRandomStreamParams = {
        language: [],
      };

      // Get language codes
      const languageCodes = this.getLanguageCodes(this.filter.language);

      // Set filter
      filter.language = languageCodes;

      this.$emit("onApplyFilterClick", filter);
    },
  },
  props: {},
});
</script>
