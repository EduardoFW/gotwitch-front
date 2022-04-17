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
import { defineComponent, inject, ref } from "vue";
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
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const languages = require("../mock/languages.json") as ILanguageType[];

    const getSelectedLanguagesFromCode = (languagesCodes: string[]) => {
      return languages.filter((language) => languagesCodes.includes(language.code)).map((language) => language.name);
    };
    const selectedLanguages = ref(getSelectedLanguagesFromCode(filter.language));

    return {
      filter,
      selectedLanguages,
      languages,
    }
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
      // Get language codes
      const languageCodes = this.getLanguageCodes(this.selectedLanguages);

      // Set filter
      this.filter.language = languageCodes;

      this.$emit("onApplyFilterClick", this.filter);
    },
  },
  props: {},
});
</script>
