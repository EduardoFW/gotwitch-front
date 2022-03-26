<template>
  <v-card width="500px">
    <v-card-title>
      <span>Filters</span>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-autocomplete
            v-model="filter.languages"
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
import { defineComponent } from "vue";

interface ILanguageType {
  code: string;
  name: string;
}

export interface IFilterReturn {
  languages: string[];
}

export default defineComponent({
  name: "FilterDialog",
  components: {},
  emits: ["onCloseClick", "onApplyFilterClick"],
  data() {
    return {
      filter: {
        languages: [],
      },
      languages: require("../mock/languages.json"),
    };
  },
  computed: {
    languageNames: function () {
      return this.languages.map((language: ILanguageType) => language.name);
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
      const filter: IFilterReturn = {
        languages: [],
      };

      // Get language codes
      const languageCodes = this.getLanguageCodes(this.filter.languages);

      // Set filter
      filter.languages = languageCodes;

      this.$emit("onApplyFilterClick", filter);
    },
  },
  props: {},
});
</script>
