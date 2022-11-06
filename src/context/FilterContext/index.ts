import { computed, InjectionKey, reactive, watch } from "vue";
import cloneDeep from "lodash.clonedeep";

export type FilterLanguage = {
  name: string;
  code: string;
}

export type FilterGame = {
  name: string;
  id: string;
}

export type Filter = {
  language: FilterLanguage[];
  gameId: FilterGame[];
}

type FilterKey = keyof Filter;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FilterContextKey = Symbol('FilterContext') as InjectionKey<any>;

const filter = reactive<Filter>({
  language: JSON.parse(localStorage.getItem('language') || '[]') as FilterLanguage[],
  gameId: JSON.parse(localStorage.getItem('gameId') || '[]') as FilterGame[],
});

watch(() => cloneDeep(filter.language), () => {
  localStorage.setItem('language', JSON.stringify(filter.language));
});

watch(() => cloneDeep(filter.gameId), () => {
  localStorage.setItem('gameId', JSON.stringify(filter.gameId));
});

const filterCount = computed(() => {
  return (Object.keys(filter) as FilterKey[]).filter((key) => {
    if (Array.isArray(filter[key])) {
      return filter[key].length > 0;
    }
    return false;
  }).length;
});

const getFilterParams = (filter: Filter) => {
  const {
    language,
    gameId,
  } = filter;

  return {
    language: language.map((l) => l.code),
    gameId: gameId.map((c) => c.id),
  }
};

const filterParams = computed(() => {
  return getFilterParams(filter);
});

export default {
  filter,
  filterCount,
  filterParams,
  getFilterParams
};