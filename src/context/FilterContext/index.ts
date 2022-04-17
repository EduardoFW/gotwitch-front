import { computed, InjectionKey, reactive, watch } from "vue";
import cloneDeep from "lodash.clonedeep";

type Filter = {
  languages: string[];
}

type FilterKey = keyof Filter;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FilterContextKey = Symbol('FilterContext') as InjectionKey<any>;

const filter = reactive<Filter>({
  languages: JSON.parse(localStorage.getItem('languages') || '[]') as string[],
});

watch(() => cloneDeep(filter.languages), () => {
  localStorage.setItem('languages', JSON.stringify(filter.languages));
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