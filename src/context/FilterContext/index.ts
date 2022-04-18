import { computed, InjectionKey, reactive, watch } from "vue";
import cloneDeep from "lodash.clonedeep";

type Filter = {
  language: string[];
  gameId: string[];
}

type FilterKey = keyof Filter;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FilterContextKey = Symbol('FilterContext') as InjectionKey<any>;

const filter = reactive<Filter>({
  language: JSON.parse(localStorage.getItem('language') || '[]') as string[],
  gameId: JSON.parse(localStorage.getItem('gameId') || '[]') as string[],
});

watch(() => cloneDeep(filter.language), () => {
  localStorage.setItem('language', JSON.stringify(filter.language));
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

export default {
  filter,
  filterCount
};