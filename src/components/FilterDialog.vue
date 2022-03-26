<template>
  <v-card>
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
      <v-btn color="error" @click="onCloseClick">Cancel</v-btn>
      <v-spacer />
      <v-btn color="primary" @click="_onApplyFilterClick">Apply</v-btn>
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
  data() {
    return {
      filter: {
        languages: []
      },
      languages: require('../mock/languages.json'),
    };
  },
  computed: {
    languageNames: function() {
      return this.languages.map((language: ILanguageType) => language.name);
    },
  },
  methods: {
    getLanguageCodes: function(languageNames: string[]): string[] {
      return this.languages.filter((language: ILanguageType) =>
        languageNames.includes(language.name)
      ).map((language: ILanguageType) => language.code);
    },
    _onApplyFilterClick: function() {
      const filter: IFilterReturn = {
        languages: []
      };

      // Get language codes
      const languageCodes = this.getLanguageCodes(this.filter.languages);

      // Set filter
      filter.languages = languageCodes;

      this.onApplyFilterClick(filter);
    },
  },
  props: {
    onCloseClick: {
      type: Function,
      default: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
    },
    onApplyFilterClick: {
      type: Function,
      default: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
    },
  },
});
</script>
